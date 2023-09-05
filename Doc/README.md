# App

## Intro

![](https://media0.giphy.com/media/Rdx8SHjHhiVUI/giphy.gif?cid=ecf05e477qw5uvph82zf1u1oft4wkt03gwal5ncc39ettbah&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Main description

The principal function of this app, is search places petfriendly arround of you, and post, share and rating the publications from other users.

Show info of each place (restaurant, hotel, cmaping, beach), and the requisits for go with youre pets(Max num of pets, size, wheight, price for pet)

Create a new places petfriendnly , if not in the app

#### User profile with some info of user, and pets like:

        -User Name
        -Location
        -Pet/s
            -Pet Name
            -Type
            -Size/Weight
        -Wish List
        -Recomendations

### And extra for implement:

     Calendar with differnets dates:
        -Birthday
        -Control vaccine of pets
        -Hair salon
        -Deworm
        -Medication
        -Vet date
        -Some important Date

    Misc:
        -Best food for pets
        -Things for pets
            -Feeder
            -Belt
            -Higienic Products

### Use cases

-   Acces Control
-   Edit User/Pet Info
-   Sarch/Share Locations
-   Add/Modify/Remove post
-   Toggle like/Share/Save post
-   Wish list
-   Rating posts

## Technical description

### Data model

User

-   Id (id)
-   Name (string)
-   Email (string)
-   Password (string)
-   Avatar (string)
-   Favs (oid array, refers to Post id)
-   Pets

Pet

-   Id(id)
-   Name (string)
-   Size (string)
-   Age (string)
-   Breed (string)
-   Description(string)

Post

-   Id (string)
-   Author (oid, refers to User id)
-   Image (string)
-   Text (string)
-   Likes (oid array, refers to User id)
-   Comments

Comments

-   Author(id)
-   Text(string)
-   Date(date)

### Test Coverage

![](https://wac-cdn.atlassian.com/dam/jcr:f29e7890-4a7a-4590-bc8b-c4c775ec301d/CDmicro-600x338-retina2x-A_11-58-7.png?cdnVersion=1077)
