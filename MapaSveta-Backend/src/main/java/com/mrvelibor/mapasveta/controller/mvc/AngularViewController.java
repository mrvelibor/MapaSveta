package com.mrvelibor.mapasveta.controller.mvc;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class AngularViewController {
    @RequestMapping(value={"/app/**"})
    public String angular() {
        return "app";
    }

    @RequestMapping(value={"/"})
    public String home() {
        return "redirect:app";
    }
}
