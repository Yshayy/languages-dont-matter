# Languages don't matter anymore!

* [Overview](#overview)
* [Getting Started](#getting-started)
  * [Pre Requirements](#pre-requirements)
  * [Installations](#installations)
* [Usage](#usage)
  * [Fake queue messages](#fake-queue-messages)
  * [First Demo](#first-demo)
    * [Run worker locally](#run-worker-locally-via-dotnet-cli)
    * [Run DQD locally](#run-dqd-locally)
  * [Second Demo](#second-demo)
    * [Run worker on K8S](#run-worker-on-kubernetes-via-docker)


## Overview
Demo created for **Yshay Yaacobi** & **Or Rosenblatt** talk at Dev.IL meetup, 13/8/18.

Additional details:
- [Meetup details](https://www.meetup.com/Dev-IL/events/253252917/)
- [Presentaion](https://www.slideshare.net/SolutoTLV/languages-dont-matter-anymore)
- [Video]()


## Getting Started

### Pre Requirements
- [docker](https://www.docker.com/get-docker)
- [Azure account](https://azure.microsoft.com/en-us/free/)
- [npm](https://www.npmjs.com/)
- [dotnet cli](https://github.com/dotnet/cli)
- [Go](https://golang.org/doc/install)

### Installations
- Install DQD
  ```bash
  go get -u github.com/soluto/dqd
  ```
  
- Prepare queue
  - Create [storage account](https://portal.azure.com/#create/Microsoft.StorageAccount-ARM)
  - Add new queue named **_languages-dont-matter-anymore_**
  - Create SAS (Shared Access Signture) token for the queue

- Environment files
  - Create **.env** file
    ```bash
    cd insert-data
    echo STORAGE_ACCOUNT_URL="<replace-with-azure-storage-account-url>" >> .env
    echo SAS_TOKEN="<replace-with-sas-token>" >> .env
    ```
  - Create **appsettings.development.json** file
    ```bash
    cd insights
    touch appsettings.development.json
    ```

## Usage

### Fake queue messages
```bash
cd insert-data
npm i
node index.js
```

### First Demo
#### Run Worker Locally (via [dotnet CLI](https://github.com/dotnet/cli))
```bash
cd insights

export ASPNETCORE_ENVIRONMENT=development

dotnet restore
dotnet build
dotnet run
```

#### Run DQD Locally
```bash
export STORAGE_ACCOUNT="<replace-with-storage-account-name>"
export QUEUE_NAME="languages-dont-matter-anymore"
export SAS_TOKEN="<replace-with-sas-token>"
export ERROR_SAS_TOKEN="<replace-with-sas-token>"
export ENDPOINT="http://localhost:5000/api/insights"

dqd
```

### Second Demo

#### Run Worker on Kubernetes (via Docker)
```bash
docker build . -t insights
docker run insights
```
