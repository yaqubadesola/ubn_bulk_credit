pipeline {
    agent any
    
    environment {
    
        DEPLOYMENT_ENVIRONMENT = 'NO_DEPLOYMENT'
        ACR_LOGINSERVER = ''
        M36_ENV = 'default'
    }

options {
          office365ConnectorWebhooks([
            [name: "Office 365", url: "https://unionbankgroup.webhook.office.com/webhookb2/43413950-c688-487f-8eee-e49a514c3e17@679a7b5d-668c-49de-901c-71c1cade6959/JenkinsCI/532cc6f178d64d6ab94bffde8019a93a/c29d09c0-8b8a-4e92-85e1-95a0fb2a9c1f",
             notifyFailure: true,notifySuccess: true,notifyBuildStart: true]
          ])
        }

    stages {
    
    stage('Determine Environment') {
    
    steps {
                echo 'Determine Environment'
                script {
                    // Determine whether this is a test or a staging / production build              
                    switch (env.GIT_BRANCH) {
                        case 'staging':
                            GLOBAL_ENVIRONMENT = 'staging'
                            ACR_LOGINSERVER = env.ACR_DEV_LOGINSERVER
                            break
                        case 'production':
                            GLOBAL_ENVIRONMENT = 'production'
                            ACR_LOGINSERVER = env.ACR_PROD_LOGINSERVER
                            break
                        default: 
                            GLOBAL_ENVIRONMENT = 'NO_DEPLOYMENT'
                            break
                    }
                }
    }
    }

     stage('Test') {
            steps {
                echo 'Testing..'
            }
        }

    
        
        stage('Build and Deploy') {
            steps {
           
            script {
                  if (GLOBAL_ENVIRONMENT == 'staging') {
	                sh "az login --identity --username 21e6d489-2816-41e3-a121-d0597b7b5ce7"
                    sh "az acr build -t \"marcuswa:{{.Run.ID}}\" -t marcuswa:release -r ${ACR_LOGINSERVER} --file Dockerfile . --subscription=53aa0ee5-e8c9-4dd2-8f75-6c284fe46111"
                  } else {
		            sh "az login"
                    sh "az acr build -t \"marcus-admin:{{.Run.ID}}\" -t marcus-admin:latest -r ${ACR_LOGINSERVER} --file Dockerfile.prod . --subscription=cfda3d2d-75c3-4919-8042-363602a34c0a"
                  }
                }
            
           
		    
            }
        }
    }
}
