package com.mrvelibor.mapasveta.model.countries;


import javax.persistence.*;
import java.util.List;

@Entity
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String commonName;

    private String officialName;

    @Column(unique = true)
    private String countryCode2;

    @Column(unique = true)
    private String countryCode3;

    private String diallingCode;

    private String domain;

    @OneToOne
    private City capital;

    private String wikipediaUrl;

    private List<String> currencies;

}
