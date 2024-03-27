import React from 'react'


    //I am changing the image links from firebase to amazon, firebase has issues with these direct links. Please remember to add the amazon link(that will show up at the error) instead of firebase at the cofig for it to work out.

export const products = [
    {
      id: "64a654593e91b8e73a351e9b",
      name: "HP ProBook 440 G9 14” Full HD Laptop, Intel Core i5-1235U, 16GB RAM, 256GB SSD, Windows 10 Pro",
      description: "",
      price: 200000,
      brand: "HP",
      category: "Laptops",
      inStock: true,
      images: [
        {
          color: "White",
          colorCode: "#FFFFFF",
          image:
            "https://lzdzy7eapvafpa4c.public.blob.vercel-storage.com/all/HP%20ProBook%20440%20G9%2014%E2%80%9D%20Full%20HD%20Laptop,%20Intel%20Core%20i5-1235U,%2016GB%20RAM,%20256GB%20SSD,%20Windows%2010%20Pro-PA3kuabwt3ltiajATdfHjDA35Vvcju.png",
        },
        /*{
          color: "Gray",
          colorCode: "#808080",
          image:
            "https://m.media-amazon.com/images/I/417tEj3iJ8L._AC_.jpg",
        },*/
      ],
      reviews: [],
    },
    {
      id: "64a4ebe300900d44bb50628a",
      name: "Apple MacBook Air 13 (2020) - M1 8 cœurs 3,2 GHz, 8 Go de RAM, 256 Go SSD - Gris sidéral (renouvelé)",
      description:
        "",
      price: 300000,
      brand: "MACBOOK",
      category: "desktops",
      inStock: true,
      images: [
        {
          color: "Black",
          colorCode: "#000000",
          image:
            "https://lzdzy7eapvafpa4c.public.blob.vercel-storage.com/all/Apple%20MacBook%20Air%2013%20(2020)%20-%20M1%208-Core%203_2GHz,%208GB%20RAM,%20256GB%20SSD%20-%20Space%20Grey%20(Renewed)-QTMepJ9ZXnwbEDIMBVYlchnbJ2Qykn.jpg",
        },
      ],
      reviews: [
        {
          id: "64a65a6158b470c6e06959ee",
          userId: "6475af156bad4917456e6e1e",
          productId: "64a4ebe300900d44bb50628a",
          rating: 5,
          comment: "good",
          createdDate: "2023-07-06T06:08:33.067Z",
          user: {
            id: "6475af156bad4917456e6e1e",
            name: "Charles",
            email: "example@gmail.com",
            //emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c",
           // hashedPassword: null,
            createdAt: "2023-05-30T08:08:53.979Z",
            updatedAt: "2023-05-30T08:08:53.979Z",
            role: "ADMIN",
          },
        },
      ],
    },
    {
      id: "648437b38c44d52b9542e340",
      name: "Logitech Aurora G705 Wireless Gaming Mouse in White",
      description:
        "Issue de la collection Aurora, la souris de jeu sans fil G705 est profilée pour le confort et le contrôle avec une conception intentionnelle pour s'adapter aux petites mains. Comprend le sans-fil, LightSpeed de qualité jeu, LightSync RVB et une technologie de jeu avancée. Souris de jeu Caractéristiques Éclairage RVB Lightsync (trois zones) Six boutons programmables Résolution : 100 - 8 200 dpi Autonomie de 40 heures avec éclairage 1Peut varier en fonction des caractéristiques de décharge de la batterie, de l'utilisateur et des conditions informatiques",
         
          price: 5000,
      brand: "Logitech",
      category: "souris",
      inStock: true,
      images: [
        {
         /* color: "Black",
          colorCode: "#000000",*/
          image:
            "https://lzdzy7eapvafpa4c.public.blob.vercel-storage.com/all/Logitech%20Aurora%20G705%20Wireless%20Gaming%20Mouse%20in%20White%20Nebraska%20Furniture%20Mart-sEs6CMD2Zp4iCWLTZxZrvxJJZ0HTQK.jpg",
        },
        /*{
          color: "Blue",
          colorCode: " #0000FF",
          image:
            "https://zijurhjioctaksze.public.blob.vercel-storage.com/ordi/Apple%20MacBook%20Air%2013%20(2020)%20-%20M1%208-Core%203_2GHz,%208GB%20RAM,%20256GB%20SSD%20-%20Space%20Grey%20(Renewed)-KnpZQ0GI4MqT91IOFshq5dC64SiYAg.jpeg",
        },
        {
          color: "Red",
          colorCode: "#FF0000",
          image:
            "https://zijurhjioctaksze.public.blob.vercel-storage.com/ordi/Apple%20MacBook%20Air%2013%20(2020)%20-%20M1%208-Core%203_2GHz,%208GB%20RAM,%20256GB%20SSD%20-%20Space%20Grey%20(Renewed)-KnpZQ0GI4MqT91IOFshq5dC64SiYAg.jpeg",
        },*/
      ],
      reviews: [
        {
          id: "6499b4887402b0efd394d8f3",
          userId: "6499b184b0e9a8c8709821d3",
          productId: "648437b38c44d52b9542e340",
          rating: 4,
          comment:
            "good enough. I like the camera and casing. the delivery was fast too.",
          createdDate: "2023-06-26T15:53:44.483Z",
          user: {
            id: "6499b184b0e9a8c8709821d3",
            name: "Chaoo",
            email: "example1@gmail.com",
            //emailVerified: null,
            image:
              "https://zijurhjioctaksze.public.blob.vercel-storage.com/ordi/Apple%20MacBook%20Air%2013%20(2020)%20-%20M1%208-Core%203_2GHz,%208GB%20RAM,%20256GB%20SSD%20-%20Space%20Grey%20(Renewed)-KnpZQ0GI4MqT91IOFshq5dC64SiYAg.jpeg",
           // hashedPassword: null,
            createdAt: "2023-06-26T15:40:52.558Z",
            updatedAt: "2023-06-26T15:40:52.558Z",
            role: "USER",
          },
        },
        {
          id: "6499a110efe4e4de451c7edc",
          userId: "6475af156bad4917456e6e1e",
          productId: "648437b38c44d52b9542e340",
          rating: 5,
          comment: "I really liked it!!",
          createdDate: "2023-06-26T14:30:40.998Z",
          user: {
            id: "6475af156bad4917456e6e1e",
            name: "Charles",
            email: "example@gmail.com",           
            image:
              "https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c",
           
            createdAt: "2023-05-30T08:08:53.979Z",
            updatedAt: "2023-05-30T08:08:53.979Z",
            role: "ADMIN",
          },
        },
      ],
    },
    {
      id: "64a4e9e77e7299078334019f",
      name: "Logitech G305 Lightspeed Wireless Gaming Mouse",
      description:
        "Contrôle croisé des ordinateurs : capacité révolutionnaire pour naviguer de manière transparente sur 3 ordinateurs et copier-coller du texte, des images et des fichiers de l'un à l'autre à l'aide de Logitech Flow. Double connectivité : utilisation avec jusqu'à 3 ordinateurs Windows ou Mac via le récepteur Unifying inclus ou le Bluetooth Smart sans fil. technologie. Bouton gestuel - Oui",
      price: 10000,
      brand: "logitech",
      category: "souris",
      inStock: true,
      images: [
        {
          color: "blue",
          colorCode: " #015b9a",
          image:
            "https://lzdzy7eapvafpa4c.public.blob.vercel-storage.com/all/Logitech%20G305%20Lightspeed%20Wireless%20Gaming%20Mouse%20in%20Blue%20Nebraska%20Furniture%20Mart-UwJ8oWOVCfMzK7fl3QJp58ZQH80snF.png",
        },
        {
          color: "gray",
          colorCode: " #b0b7bd",
          image:
            "https://lzdzy7eapvafpa4c.public.blob.vercel-storage.com/all/Best%20Buy%20Logitech%20G305%20LIGHTSPEED%20Wireless%20Optical%206%20Programmable%20Button%20Gaming%20Mouse%20with%2012,000%20DPI%20HERO%20Sensor%20White%20910-005289-U90q1j4IXkR7xWsHQObGkLuVrCgAjF.jpeg",
        },
      ],
      reviews: [
        {
          id: "6499b4887402b0efd394d8f3",
          userId: "6499b184b0e9a8c8709821d3",
          productId: "648437b38c44d52b9542e340",
          rating: 4,
          comment:
            "good enough. I like the camera and casing. the delivery was fast too.",
          createdDate: "2023-06-26T15:53:44.483Z",
          user: {
            id: "6499b184b0e9a8c8709821d3",
            name: "Chaoo",
            email: "example1@gmail.com",
            //emailVerified: null,
            image:
              "https://zijurhjioctaksze.public.blob.vercel-storage.com/ordi/Apple%20MacBook%20Air%2013%20(2020)%20-%20M1%208-Core%203_2GHz,%208GB%20RAM,%20256GB%20SSD%20-%20Space%20Grey%20(Renewed)-KnpZQ0GI4MqT91IOFshq5dC64SiYAg.jpeg",
           // hashedPassword: null,
            createdAt: "2023-06-26T15:40:52.558Z",
            updatedAt: "2023-06-26T15:40:52.558Z",
            role: "USER",
          },
        },
        {
          id: "6499a110efe4e4de451c7edc",
          userId: "6475af156bad4917456e6e1e",
          productId: "648437b38c44d52b9542e340",
          rating: 5,
          comment: "I really liked it!!",
          createdDate: "2023-06-26T14:30:40.998Z",
          user: {
            id: "6475af156bad4917456e6e1e",
            name: "Charles",
            email: "example@gmail.com",
           // emailVerified: null,
            image:
              "https://lh3.googleusercontent.com/a/AAcHTteOiCtILLBWiAoolIW9PJH-r5825pBDl824_8LD=s96-c",
           // hashedPassword: null,
            createdAt: "2023-05-30T08:08:53.979Z",
            updatedAt: "2023-05-30T08:08:53.979Z",
            role: "ADMIN",
          },
        },
      ],
    },
    {
      id: "649d775128b6744f0f497040",
      name: 'Smart Watch(Answer/Make Call), 1.85" Smartwatch for Men Women IP68 Waterproof, 100+ Sport Modes, Fitness Activity Tracker, Heart Rate Sleep Monitor, Pedometer, Smart Watches for Android iOS, 2023',
      description:
        'Bluetooth Call and Message Reminder: The smart watch is equipped with HD speaker, after connecting to your phone via Bluetooth, you can directly use the smartwatches to answer or make calls, read messages, store contacts, view call history. The smartwatch can set up more message notifications in "GloryFit" APP. You will never miss any calls and messages during meetings, workout and riding.',
      price: 50,
      brand: "Nerunsa",
      category: "Watch",
      inStock: true,
      images: [
        {
          color: "Black",
          colorCode: "#000000",
          image:
            "https://zijurhjioctaksze.public.blob.vercel-storage.com/ordi/Apple%20MacBook%20Air%2013%20(2020)%20-%20M1%208-Core%203_2GHz,%208GB%20RAM,%20256GB%20SSD%20-%20Space%20Grey%20(Renewed)-KnpZQ0GI4MqT91IOFshq5dC64SiYAg.jpeg",
        },    
      ],
      reviews: [],
    },
  ];
