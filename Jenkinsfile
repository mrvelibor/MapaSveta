#!/usr/bin/env groovy

pipeline {
    agent any

    stages {
        stage('Node') {
            steps {
                echo 'Node..'
                sh 'chmod +x ./node.sh'
                sh './node.sh'
            }
        }
        stage('Maven') {
            steps {
                echo 'Maven..'
                sh 'chmod +x ./maven.sh'
                sh './maven.sh'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}