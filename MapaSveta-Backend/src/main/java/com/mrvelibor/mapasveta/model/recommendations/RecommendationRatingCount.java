package com.mrvelibor.mapasveta.model.recommendations;

public class RecommendationRatingCount {
    public Recommendation recommendation;
    public long upvotes;
    public long downvotes;

    public RecommendationRatingCount() {
    }

    public RecommendationRatingCount(Recommendation recommendation, long upvotes, long downvotes) {
        this.recommendation = recommendation;
        this.upvotes = upvotes;
        this.downvotes = downvotes;
    }

    public long getRating() {
        return upvotes - downvotes;
    }

    public double getPercentage() {
        return 100.0 * upvotes / (upvotes + downvotes);
    }
}
