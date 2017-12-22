package com.mrvelibor.mapasveta.model.common;

import javax.persistence.*;

@Entity
public class Currency {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(unique = true)
    private String code;

    private String name;
}
