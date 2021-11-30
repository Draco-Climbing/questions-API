FROM mongo:latest

RUN mkdir /seed/
COPY *.csv /seed/

COPY schema.sh /docker-entrypoint-initdb.d

# CMD mongod