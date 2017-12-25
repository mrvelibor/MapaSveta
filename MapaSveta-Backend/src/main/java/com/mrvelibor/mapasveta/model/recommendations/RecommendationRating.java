package com.mrvelibor.mapasveta.model.recommendations;

import com.mrvelibor.mapasveta.model.user.User;

import javax.persistence.*;

@Table(uniqueConstraints= @UniqueConstraint(columnNames={"recommendation_id", "user_id"}))
@Entity
public class RecommendationRating {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne
    private Recommendation recommendation;

    @ManyToOne
    private User user;

    private int rating;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Recommendation getRecommendation() {
        return recommendation;
    }

    public void setRecommendation(Recommendation recommendation) {
        this.recommendation = recommendation;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public int getRating() {
        return rating;
    }

    public void setRating(int rating) {
        this.rating = rating;
    }
}
