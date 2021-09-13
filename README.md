
# Implementacija backenda socijalne mreže u mikroservisnoj arkihtekturi nad platformom kubernetes
***
### Diplomski rad
Autor: Filip Degmečić

Mentor: doc. dr. sc.  Nikola Tanković

### Sažetak
Sve veći broj organizacija prisvaja mikroservisnu arhitekturu kao odabrani način organiziranja razvoja sustava. Mikroservisna arhitektura donosi veliki broj prednosti, ali i određene mane naspram monolitne arhitekture koje su prikazane u ovom radu. Koristeći Docker, svaki servis zapakiran je u kontejner, koji osigurava izolaciju sustava od vanjskih elemenata. Jedna od glavnih prepreka, orkestriranje kontejnerima riješeno je koristeći platformu Kubernetes. Implementacija programskog rješenja koristi princip baza podataka po usluzi te tako omogućava nesmetani rad sustava u slučaju pada zasebnog dijela sustava. Komponente su u stanju zasebno nastaviti rad te nemaju nikakve vanjske zavisnosti. 


[Sveučilište Jurja Dobrile u Puli](https://www.unipu.hr/), [Fakultet informatike](https://fipu.unipu.hr/fipu)

### Opis arhitekture:
Technologies used: React(Next.js), Node.js(Express), Kubernetes, Skaffold, Docker, Google Kubernetes Engine, MongoDb, NATS streaming(events)

Web aplikacija: [Live app: (Digital Ocean host)](http://www.fipubook-microservices-prod.com/)

Dokumentacija: [priložena dokumentacija diplomskog rada](https://github.com/fdegmecic/FipubookMicroservices/files/7154374/FilipDegmecicDiplomskiRad.pdf)


![Fipubook-Architecture drawio](https://user-images.githubusercontent.com/42947589/132140228-6804e171-1b90-4c05-8867-708241bffdf1.png)

***
# Implementing backend for social network in microservice architecture on the kubernetes platform
***
### Master's thesis
Author: Filip Degmečić 

Mentor: doc. dr. sc.  Nikola Tanković

[University of Jurja Dobrile of Pula](https://www.unipu.hr/), [Faculty of informatics](https://fipu.unipu.hr/fipu)

### Abstract 
Increasing number of organisations are adopting a microservice architecture as the desired way of organising their system development. Microservice architecture brings a lot of advantages compared to monolith architecture, but also many drawbacks which are displayed in this thesis. Using Docker, every service is packaged into a container, which provides the system isolation from outside elements. One of the main obstacles, orchestrating containers is resolved by using the Kubernetes platform. This implementation uses database per service principle as a way to offer unobstructed performance in case of a crash in a specific system component. Components are able to operate uninterruptedly and have no outside dependencies

***

### Database:
![Fipubook-Database drawio](https://user-images.githubusercontent.com/42947589/132140232-04f8aa7e-338b-4449-8573-ac6504437241.png)
