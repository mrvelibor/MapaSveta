#!/usr/bin/env groovy

pipeline {
    agent any

    stages {
        stage('Node') {
            steps {
                echo 'Node..'
                dir 'MapaSveta-Frontend'
                sh 'node -v'
                sh 'npm prune'
                sh 'npm install'
                sh 'npm build dev'
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