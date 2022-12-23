from django.shortcuts import render,redirect, get_object_or_404
from django.http import HttpResponse
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from django.contrib import messages
from django.contrib.auth.models import User
from django.contrib.auth import login,authenticate,logout
from django.http import JsonResponse
from .models import Internship,Compulsary,Optional,Todo
import json
import PyPDF2
import spacy

# Create your views here.

def mailer(file,receiver,body,subject):
    
    email_user = 'atharvatekawade@gmail.com'
    email_password = 'atharva@123'
    email_send = receiver

    subject = 'Application for '+subject

    msg = MIMEMultipart()
    msg['From'] = email_user
    msg['To'] = email_send
    msg['Subject'] = subject
    body="Purpose of Joining:"+'\n'+body
    msg.attach(MIMEText(body,'plain'))

    #filename=file
    attachment  =file

    part = MIMEBase('application','octet-stream')
    part.set_payload((attachment).read())
    encoders.encode_base64(part)
    part.add_header('Content-Disposition',"attachment; filename=resume.pdf")

    msg.attach(part)
    text = msg.as_string()
    server = smtplib.SMTP('smtp.gmail.com',587)
    server.starttls()
    server.login(email_user,email_password)


    server.sendmail(email_user,email_send,text)
    server.quit()



def check(request):
    if(request.user.is_authenticated):
        return HttpResponse(request.user.username)
    else:
        return HttpResponse('No')

def api(request):
    if(request.method=='GET'):
        collection=Todo.objects.all()
        arr=[]
        for i in collection:
            d={}
            d['name']=i.todo
            arr.append(d)
        return JsonResponse(arr,safe=False)

    elif(request.method=='POST'):
        if request.user.is_authenticated:
            new_todo=Todo(todo=request.POST['todo'])
            new_todo.save()
            return HttpResponse('Todo Added')
        else:
            return HttpResponse('Get Logged in First', status=401)

def users(request):
    collection=User.objects.all()
    arr=[]
    for i in collection:
        d={}
        d['id']=i.id
        d['name']=i.username
        arr.append(d)
    return JsonResponse(arr,safe=False)

def loginuser(request):
    if(request.method=='GET'):
        return render(request,'login.html')
    else:
        user=authenticate(request,username=request.POST['name'],password=request.POST['password'])
        if user is None:
            messages.error(request,'Invalid Credentials...')
            return redirect('/login')
        else:
            login(request,user)
            return redirect('/')


def logoutuser(request):
    if(request.method=='DELETE'):
        logout(request)
        return HttpResponse('User Logged Out')

def register(request):
    if(request.method=='GET'):
        return render(request,'register.html')
    else:
        user=User.objects.create_user(request.POST['name'],password=request.POST['password'],email=request.POST['email'])
        user.save()
        return redirect('/')

def fetch(request,category):
    if(request.method=='GET'):
        collection=Internship.objects.filter(category=category)
        arr=[]
        for i in collection:
            d={}
            d['id']=i.id
            d['category']=i.category
            d['title']=i.title
            d['last']=i.last
            d['duration']=i.duration
            d['user']=i.user.username
            arr.append(d)
        return JsonResponse(arr,safe=False)



def apply(request,internship):
    if(request.method=='GET'):
        return render(request,'apply.html',{'id':str(internship)})
    else:
        nlp = spacy.load('en_core_web_sm')
        body=request.POST.get('content')
        print(body)
        file=request.FILES['file']
        file1=request.FILES['file1']
        stop=['ourselves', 'hers', 'between', 'yourself', 'but', 'again', 'there', 'about', 'once', 'during', 'out', 'very', 'having', 'with', 'they', 'own', 'an', 'be', 'some', 'for', 'do', 'its', 'yours', 'such', 'into', 'of', 'most', 'itself', 'other', 'off', 'is', 's', 'am', 'or', 'who', 'as', 'from', 'him', 'each', 'the', 'themselves', 'until', 'below', 'are', 'we', 'these', 'your', 'his', 'through', 'don', 'nor', 'me', 'were', 'her', 'more', 'himself', 'this', 'down', 'should', 'our', 'their', 'while', 'above', 'both', 'up', 'to', 'ours', 'had', 'she', 'all', 'no', 'when', 'at', 'any', 'before', 'them', 'same', 'and', 'been', 'have', 'in', 'will', 'on', 'does', 'yourselves', 'then', 'that', 'because', 'what', 'over', 'why', 'so', 'can', 'did', 'not', 'now', 'under', 'he', 'you', 'herself', 'has', 'just', 'where', 'too', 'only', 'myself', 'which', 'those', 'i', 'after', 'few', 'whom', 't', 'being', 'if', 'theirs', 'my', 'against', 'a', 'by', 'doing', 'it', 'how', 'further', 'was', 'here', 'than','','.',' ',' .','. ']
        stop=set(stop)
        words=set() 
        reader=PyPDF2.PdfFileReader(file)
        pageObj = reader.getPage(0)  
        nlp_text = nlp(str(pageObj.extractText()))
        a=0
        b=0
        manadatory=Compulsary.objects.filter(internship=int(internship))
        optional=Optional.objects.filter(internship=int(internship))
        man=[]
        opt=[]
        tokens = [token.text for token in nlp_text if not token.is_stop]
        for i in manadatory:
            man.append(i.skill.lower())
        for i in optional:
            opt.append(i.skill.lower())
        arr=set()
        brr=set()
        for token in tokens:
            if token.lower() in man:
                a=a+1
                arr.add(token.lower())
            if token.lower() in opt:
                b=b+1
                brr.add(token.lower())
        print(arr)
        for token in nlp_text.noun_chunks:
            token = token.text.lower().strip()
            if token.lower() in man:
                arr.add(token.lower())
            if token.lower() in opt:
                brr.add(token.lower())

        req_internship=get_object_or_404(Internship,pk=int(internship))
        if(len(arr)/len(manadatory)>=0.6 and len(brr)/len(optional)>=0.1):
            mailer(file1,req_internship.user.email,body,req_internship.title)
            return HttpResponse('Resume Accepted')
        return HttpResponse('Resume rejected')




def see(request,internship):
    if(request.method=='GET'):
        req_internship=get_object_or_404(Internship,pk=int(internship))
        manadatory=Compulsary.objects.filter(internship=req_internship)
        optional=Optional.objects.filter(internship=req_internship)
        return render(request,'see.html',{'internship':req_internship,'man':manadatory,'opt':optional})

def test(request):
    if(request.method=='POST'):
        text = request.body.decode('utf8').replace("'", '"')
        text=eval(text)
        new_internship=Internship(
            title=text['title'],
            desc=text['desc'],
            last=text['last'],
            category=text['type'],
            duration=text['duration'],
            user=request.user
        )
        new_internship.save()
        for i in (text['compulsary']):
            new_compulsary=Compulsary(
                skill=i['first'],
                internship=new_internship
            )
            new_compulsary.save()
        for i in (text['optional']):
            new_optional=Optional(
                skill=i['second'],
                internship=new_internship
            )
            new_optional.save()

        return HttpResponse('Internship recorded')
