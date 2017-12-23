package com.mrvelibor.mapasveta.model.common.enums;

public enum VisaRequirementEnum {
    visa_free, visa_on_arrival, electronic_visa, visa_required;

    public static VisaRequirementEnum fromString(String str) {
        if (str == null) {
            return null;
        }
        switch (str) {
            case "free":
            case "union":
                return visa_free;
            case "arrival":
                return visa_on_arrival;
            case "electronic":
                return electronic_visa;
            case "required":
                return visa_required;
        }
        return null;
    }
}
