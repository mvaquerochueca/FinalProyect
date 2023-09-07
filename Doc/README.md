# App PETLOCATION

## Intro

Currently, people with pets are limited to being able to enjoy their free time with them, due to the lack of places suitable or accessible for animals. For the vast majority, they are another member of the family, whom they do not want to leave locked up at home when they go do anything together. Therefore, the idea of ​​being able to quickly and easily have information on places that are pet-friendly is a solution for all pet lovers.

![](https://media0.giphy.com/media/Rdx8SHjHhiVUI/giphy.gif?cid=ecf05e477qw5uvph82zf1u1oft4wkt03gwal5ncc39ettbah&ep=v1_gifs_search&rid=giphy.gif&ct=g)

## Main description

The principal function of this app, is search places petfriendly arround of you, post , share and rating the publications from other users.

Show info of each place (restaurant, hotel, cmaping, beach), and the requisits for go with youre pets(Max num of pets, size, wheight, price for pet)

#### User profile with some info of user, and pets like:

### Use cases

-   Create User
-   Create Pet user
-   Create Post
-   Create Reminders
-   Search Locations
-   Wish List

### Next Version

-   Send Mail/Notif Reminder
-   Calculate Pets Vacines
-

## Technical description

### Data model

User

-   Id (id)
-   Name (string)
-   Email (string)
-   Password (string)
-   Avatar (string)
-   Favs (oid array, refers to Post id)
-   Pets(oid array)

Pet

-   Owner(oid , refers User Id)
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

Reminder

-   Author(id)
-   Text(string)
-   Date(date)

### Test Coverage

![](https://imgur.com/DCtDwtd.png)
