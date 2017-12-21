#!/usr/bin/env groovy

pipeline {
    agent any

    stages {
        stage('Prepare') {
            steps {
                echo 'Prepare...'
                sh 'chmod +x ./prepare.sh'
                sh './prepare.sh'
            }
        }
        stage('Node') {
            steps {
                echo 'Node...'
                sh 'chmod +x ./node.sh'
                sh './node.sh'
            }
        }
        stage('Maven') {
            steps {
                echo 'Maven...'
                sh 'chmod +x ./maven.sh'
                sh './maven.sh'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying...'
                sh 'chmod +x ./deploy.sh'
                sh './deploy.sh'
            }
        }
    }
}