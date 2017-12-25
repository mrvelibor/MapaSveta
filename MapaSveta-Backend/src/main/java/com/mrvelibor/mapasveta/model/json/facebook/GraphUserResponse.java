package com.mrvelibor.mapasveta.model.json.facebook;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.mrvelibor.mapasveta.model.common.enums.Gender;

import java.util.Date;

public class GraphUserResponse {
    public String id;
    public String name;
    public String first_name;
    public String last_name;
    public String email;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "MM/dd/yyyy")
    public Date birthday;
    public GraphAgeRange age_range;
    public Gender gender;
    public GraphLocationWrapper hometown;
    public GraphLocationWrapper location;
    public GraphPicture picture;
}
