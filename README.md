Languages don't matter anymore!
=============

* [Overview](#overview)
* [Getting Started](#getting-started)
  * [Pre Requirements](#pre-requirements)
  * [Installation](#installation)
* [Usage](#usage)
  * [Run worker](#run-worker)
  * [Fake queue messages](#fake-queue-messages)


Overview
--------
Demo created for **Yshay Yaacobi** & **Or Rosenblatt** talk at Dev.IL meetup, 13/8/18.
<br />
Additional details:
- [Meetup details](https://www.meetup.com/Dev-IL/events/253252917/)
- [Presentaion](https://www.slideshare.net/SolutoTLV/languages-dont-matter-anymore)
- [Video]()


Getting Started
------------

### Pre Requirements
- [docker](https://www.docker.com/get-docker) installation
- [Azure account](https://azure.microsoft.com/en-us/free/)
- [npm](https://www.npmjs.com/) installation
- [dotnet cli](https://www.npmjs.com/) installation
- [DQD]
    ```
    go get -u github.com/soluto/dqd
    ```

### Installation
- Prepare queue
  - Create [storage account](https://portal.azure.com/#create/Microsoft.StorageAccount-ARM)
  - Add new queue named 'languages-dont-matter-anymore'
  - Create SAS token for the queue (Shared Access Signture)
  - Create `.env` file
    ```
    cd insert-data
    echo STORAGE_ACCOUNT_URL="<replace-with-azure-storage-account-url>" >> .env
    echo SAS_TOKEN="<replace-with-sas-token>" >> .env
    ```
  - Create `appsettings.development.json` file
    ```
    cd insights
    touch appsettings.development.json
    ```

Usage
------------

### Fake queue messages
```
cd insert-data
npm i
node index.js
```

### Run Worker Locally (via [dotnet CLI](https://github.com/dotnet/cli))
```
cd insights
dotnet restore
dotnet build
export ASPNETCORE_ENVIRONMENT=development
dotnet run
```

### Run DQD Locally
```
export STORAGE_ACCOUNT="<replace-with-storage-account-name>"
export QUEUE_NAME="languages-dont-matter-anymore"
export SAS_TOKEN="<replace-with-sas-token>"
export ERROR_SAS_TOKEN="<replace-with-sas-token>"
export ENDPOINT="http://localhost:5000/api/insights"
dqd
```

### Run Worker Locally (via [dotnet CLI](https://github.com/dotnet/cli))
```
docker build . -t insights
docker run insights
```