FROM mongo:latest

RUN mkdir -p /seed/
COPY data/*.csv /seed/
COPY database/dataSetup.js /seed/

COPY schema.sh /docker-entrypoint-initdb.d

# CMD mongod