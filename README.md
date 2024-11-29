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
1.Descarrega la imatge oficial de docker
2.Posar en marxa un sol mongoDB amb autenticació
3.Crear un usuari bàsic (todo?) propietari d'una base de dades concreta (tododb?)
4.Instal·lar MongoCompass i configurar-lo per interactuar amb la base de dades de l'usuari creat

#### Opció Kind
1.Crear un cluster de K8s (kind create cluster --config cluster-config.yaml) amb la configuració següent:
````
kind: Cluster
apiVersion: kind.x-k8s.io/v1alpha4
nodes:
- role: control-plane
  extraPortMappings:
  - containerPort: 30000
    hostPort: 30000
    protocol: TCP
- role: worker
- role: worker

````
2.Desplegar un sol mongodb (architecture: standalone) utilitzant el helm chart de Bitnami que tingui autenticació: https://github.com/bitnami/charts/tree/main/bitnami/mongodb. Ull! Si volem que aplicacions web es connectin al mongo des de fòra del clúster, cal crear un ingress (mirar opcions values.yaml o aplicar un manualment).
3.Crear un usuari bàsic (todo?) propietari d'una base de dades concreta (tododb?)
4.Instal·lar MongoCompass i configurar-lo per interactuar amb la base de dades de l'usuari creat.


### 2. Aplicació Web Todo-List

1.Utilitza la comanda següent per clonar el repositori al teu entorn local:
```bash
git clone https://github.com/amoro1900/To-Do-List-MongoDB
cd To-Do-List-MongoDB
```
2.Canvia els valors de les variables del Makefile per ajustar-los al servei de mongo que has aixecat.
3.Crea la imatge de l'aplicació amb l'ajuda del Makefile.
4.Aixeca un container de l'aplicació.
5.Comprova els logs del container. Si tot ha anat bé, hauria de mostrar el següent log:
````
Server Up and running at http://localhost:8080
Connectat a MongoDB!
````

### 3. Accions post-posada en marxa
1.Entra a l'aplicació via navegador i crea/modifica/elimina tasques i comprova amb MongoCompass o amb mongosh que les dades es es desen correctament. 
2.Realitza un backup de la base de dades del client amb l'eina mongodump.
3.Esborra totes/algnues tasques (des del web o la shell). Verificat que ja no hi són a la base de dades. Restaura el backup amb l'eina mongorestore i comprova que s'han recuperat les tasques.
