# ToDo-List MongoDB

Aquesta és una aplicació web de gestió de tasques (To-Do List) que utilitza Node.js, Express i MongoDB. Permet crear, visualitzar, editar i eliminar tasques.

## Requisits previs

1. **Docker i Docker Compose o Kind/Minikube**: L'aplicació s'executa en contenidors Docker.
2. **Git**: Per descarregar el repositori.

---

## Instal·lació i posada en marxa

Segueix aquests passos per posar l'aplicació en funcionament:

### 1. Posada en marxa del servei MongoDB
#### Opció Docker
1. Item Descarrega la imatge oficial de docker
2. Item Posar en marxa un sol mongoDB amb autenticació
3. Item Crear un usuari bàsic (todo?) propietari d'una base de dades concreta (tododb?)
4. Item Instal·lar MongoCompass i configurar-lo per interactuar amb la base de dades de l'usuari creat

#### Opció Kind
1. Item Crear un cluster de K8s (kind create cluster --config cluster-config.yaml) amb la configuració següent:
````
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  extraPortMappings:
  - containerPort: 8080
    hostPort: 8080
    protocol: TCP
- role: worker
- role: worker

````
2.  Item Desplegar un sol mongodb (architecture: standalone) utilitzant el helm chart de Bitnami que tingui autenticació: https://github.com/bitnami/charts/tree/main/bitnami/mongodb. Ull! Si volem que aplicacions web es connectin al mongo des de fòra del clúster, cal crear un ingress (mirar opcions values.yaml o aplicar un manualment).
3.  Item Crear un usuari bàsic (todo?) propietari d'una base de dades concreta (tododb?)
4. Item Instal·lar MongoCompass i configurar-lo per interactuar amb la base de dades de l'usuari creat.


### 2. Aplicació Web Todo-List

1.  Item Utilitza la comanda següent per clonar el repositori al teu entorn local:
```bash
git clone https://github.com/amoro1900/To-Do-List-MongoDB
cd To-Do-List-MongoDB
```
2.  Item Canvia els valors de les variables del Makefile per ajustar-los al servei de mongo que has aixecat.
3.  Item Crea la imatge de l'aplicació amb l'ajuda del Makefile.
4.  Item Aixeca un container de l'aplicació.
5.  Item Comprova els logs del container. Si tot ha anat bé, hauria de mostrar el següent log:
````
Server Up and running at http://localhost:8080
Connectat a MongoDB!
````

### 3. Accions post-posada en marxa
1.  Item Entra a l'aplicació via navegador i crea/modifica/elimina tasques i comprova amb MongoCompass o amb mongosh que les dades es es desen correctament. 
2.  Item Realitza un backup de la base de dades del client amb l'eina mongodump.
3.  Item Esborra totes/algnues tasques (des del web o la shell). Verificat que ja no hi són a la base de dades. Restaura el backup amb l'eina mongorestore i comprova que s'han recuperat les tasques.

Genera una imatge nova per generar tasques automàticament seguint les següents instruccions:
1.  Item Al Dockerfile, comenta la línia 'ENTRYPOINT ["node" , "index.js"]'  i descomenta la línia ENTRYPOINT ["node" , "task-generator.js"]'.
2.  Item Al Makefile comentar IMAGE_NAME=todo-list-monngodb i descomentar IMAGE_NAME=generator-monngodb. Assegurar que les variables de la connexió amb mongodb són correctes.
3.  Item Crear una nova imatge i posar en marxa: make build i make run.
4.  Item  Comprova que es generen insercions a la base de dades.
5.  Item  Espera a que s'hagin inserit 3 milions de tasques i mata el container.
6.  Item  Fes una cerca d'una tasca. Agafa dels logs el nom d'una tasca i fes una cerca db.todotasks.findOne({content:"xxxx"})
7.  Item Ha trigat força estona perquè no hi havia index. Crea un index sobre el camp content i repeteix la cerca. db.todotasks.createIndex({content:1}, {unique:true}). Hauria de ser molt més ràpid.

### 4. Mongodb amb replicació
1. Item Recrea el servei de mongodb però aquest cop amb una arquitectura Replicaset amb 3 nodes. Ull! Redueix els temps i weight dels 3 nodes perquè es faci el canvi de primary ràpidament (veure secció replicaSetConfigurationSettings [heartbeatTimeoutSecs, electionTimeoutMillis,heartbeatIntervalMillis ])
2. Item Comprova que les dades inserides pel web es repliquen a tots els nodes.
3. Item Tomba el container del node Primary i comprova que algun dels secondary es converteix en primary.
4. Item realitza un backup però amb amb la opció --oplog (si pot ser mentres el generator insereix dades) i fes una restauració.
5. Item Comprova que la restauració és com un snapshot de l'estat de l'inici del mongodump.