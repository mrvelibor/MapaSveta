#!/usr/bin/env groovy

pipeline {
  agent any

  stages {
      stage('Prepare') {
          steps {
              echo 'Prepare...'
              sh """
              ssh root@localhost systemctl stop MapaSveta.service
              """
          }
      }
      stage('Node') {
          steps {
              echo 'Node...'
              sh """
              cd MapaSveta-Frontend
              echo $PWD
              npm install
              npm run "build prod"
              """
          }
      }
      stage('Maven') {
          steps {
              echo 'Maven...'
              sh """
              cd MapaSveta-Backend
              echo $PWD
              mvn clean
              mvn package
              """
          }
      }
      stage('Deploy') {
          steps {
              echo 'Deploying...'
              sh """
              ssh root@localhost systemctl start MapaSveta.service
              """
          }
      }
  }
}