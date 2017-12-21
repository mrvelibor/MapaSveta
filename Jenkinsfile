#!/usr/bin/env groovy

pipeline {
    agent any

    stages {
        stage('Node') {
            steps {
                echo 'Node..'
                sh 'node.sh'
            }
        }
        stage('Maven') {
            steps {
                echo 'Maven..'
            }
        }
        stage('Deploy') {
            steps {
                echo 'Deploying....'
            }
        }
    }
}