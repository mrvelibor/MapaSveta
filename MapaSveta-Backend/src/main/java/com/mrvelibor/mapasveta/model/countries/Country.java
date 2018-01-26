package com.mrvelibor.mapasveta.model.countries;


import com.mrvelibor.mapasveta.model.common.Currency;
import com.mrvelibor.mapasveta.model.common.Language;

import javax.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
public class Country {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String commonName;

    private String officialName;

    @ElementCollection
    private Set<String> nativeNames;

    private String serbianName;

    @Column(unique = true)
    private String countryCode2;

    @Column(unique = true)
    private String countryCode3;

    @Column(unique = true)
    private String countryCode3n;

    @Column(unique = true)
    private String visaCode;

    private String diallingCode;

    private String domain;

    @OneToOne
    private City capital;

    private String wikipediaUrl;

    private long visitorCount;

    private long wishListCount;

    private long recommendationCount;

    @ManyToMany
    private List<Currency> currencies;

    @ManyToMany
    private List<Language> languages;

    public String getFlagUrl() {
        return "/res/country_flags/" + countryCode3.toLowerCase() + ".svg";
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCommonName() {
        return commonName;
    }

    public void setCommonName(String commonName) {
        this.commonName = commonName;
    }

    public String getOfficialName() {
        return officialName;
    }

    public void setOfficialName(String officialName) {
        this.officialName = officialName;
    }

    public Set<String> getNativeNames() {
        return nativeNames;
    }

    public void setNativeNames(Set<String> nativeNames) {
        this.nativeNames = nativeNames;
    }

    public String getSerbianName() {
        return serbianName;
    }

    public void setSerbianName(String serbianName) {
        this.serbianName = serbianName;
    }

    public String getCountryCode2() {
        return countryCode2;
    }

    public void setCountryCode2(String countryCode2) {
        this.countryCode2 = countryCode2;
    }

    public String getCountryCode3() {
        return countryCode3;
    }

    public void setCountryCode3(String countryCode3) {
        this.countryCode3 = countryCode3;
    }

    public String getCountryCode3n() {
        return countryCode3n;
    }

    public void setCountryCode3n(String countryCode3n) {
        this.countryCode3n = countryCode3n;
    }

    public String getVisaCode() {
        return visaCode;
    }

    public void setVisaCode(String visaCode) {
        this.visaCode = visaCode;
    }

    public String getDiallingCode() {
        return diallingCode;
    }

    public void setDiallingCode(String diallingCode) {
        this.diallingCode = diallingCode;
    }

    public String getDomain() {
        return domain;
    }

    public void setDomain(String domain) {
        this.domain = domain;
    }

    public City getCapital() {
        return capital;
    }

    public void setCapital(City capital) {
        this.capital = capital;
    }

    public String getWikipediaUrl() {
        return wikipediaUrl;
    }

    public void setWikipediaUrl(String wikipediaUrl) {
        this.wikipediaUrl = wikipediaUrl;
    }

    public long getVisitorCount() {
        return visitorCount;
    }

    public void setVisitorCount(long visitorCount) {
        this.visitorCount = visitorCount;
    }

    public long getWishListCount() {
        return wishListCount;
    }

    public void setWishListCount(long wishListCount) {
        this.wishListCount = wishListCount;
    }

    public long getRecommendationCount() {
        return recommendationCount;
    }

    public void setRecommendationCount(long recommendationCount) {
        this.recommendationCount = recommendationCount;
    }

    public List<Currency> getCurrencies() {
        return currencies;
    }

    public void setCurrencies(List<Currency> currencies) {
        this.currencies = currencies;
    }

    public List<Language> getLanguages() {
        return languages;
    }

    public void setLanguages(List<Language> languages) {
        this.languages = languages;
    }
}
