#!/bin/bash
set -e

psql -v ON_ERROR_STOP=1 --username "$POSTGRES_USER" --dbname "$POSTGRES_DB" <<-EOSQL

  CREATE USER authservice WITH PASSWORD 'auth';
  CREATE DATABASE authdb OWNER authservice;

  CREATE USER userservice WITH PASSWORD 'user';
  CREATE DATABASE userdb OWNER userservice;

  CREATE USER tenantservice WITH PASSWORD 'tenant';
  CREATE DATABASE tenantdb OWNER tenantservice;

  CREATE USER productservice WITH PASSWORD 'product';
  CREATE DATABASE productdb OWNER productservice;

  CREATE USER registerservice WITH PASSWORD 'register';
  CREATE DATABASE registerdb OWNER registerservice;

  CREATE USER orderservice WITH PASSWORD 'order';
  CREATE DATABASE orderdb OWNER orderservice;

  CREATE USER paymentservice WITH PASSWORD 'payment';
  CREATE DATABASE paymentdb OWNER paymentservice;

  CREATE USER notificationservice WITH PASSWORD 'notification';
  CREATE DATABASE notificationdb OWNER notificationservice;

EOSQL
