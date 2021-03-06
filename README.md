# TabInsight-Server-Nodejs
Backend Server Software to crunch app usage numbers
##Introduction
TabInsight Server is the backend server software to consume relevant data sent from the tabinsight app. 
The server is written Node.js, along with extension code written to interact with elasticsearch. 
The server application can be deployed on an cloud instance like Virtual machine spined up from any popular cloud machine.
##Getting Started: Requirements
* Virtual or Physical Machine with Ubuntu 14.04
* Elastic Search 1.6
* Kibana 1.4
* Node JS v0.10.25

##Installation
 - You can manually install Elastic Search or use the clone the [tabinsight server](https://github.com/TabInsight/TabInsight-Server) and run [elk_installer.sh](https://github.com/TabInsight/TabInsight-Server/blob/master/elk_installers/elk_install.sh)

- Clone tabinsight-server-nodejs repostory and run the [install.sh](https://github.com/TabInsight/TabInsight-Server-Nodejs/blob/master/install.sh)

##API Specification
The TabInsight API is core set of three Node JS APIs which enable interfacing data received from individual tablets and elastic search
* **Log API** (`<url>/log`): Provides endpoint for processing single request from tablet. 
* **Logs API** (`<url>/logs`):  Provides endpoint for processing multiple requests from tablet. Data presented to either API has be of the following format `{"device": "xyz", "access_time": "123", "app_name": "abc", "use_time": "1"}`
* **Session API** (`<url>/index`): Provides endpoint for validating service uptime and configuration.
