# Generated by Django 3.0.7 on 2020-08-20 18:08

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('main', '0002_auto_20200820_2337'),
    ]

    operations = [
        migrations.CreateModel(
            name='Internship',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(default='Title', max_length=100)),
                ('desc', models.TextField(default='Description')),
                ('last', models.CharField(default='Not', max_length=100)),
                ('category', models.CharField(default='web', max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Optional',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('skill', models.CharField(default='Skill', max_length=100)),
                ('internship', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.Internship')),
            ],
        ),
        migrations.CreateModel(
            name='Compulsary',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('skill', models.CharField(default='Skill', max_length=100)),
                ('internship', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='main.Internship')),
            ],
        ),
    ]
