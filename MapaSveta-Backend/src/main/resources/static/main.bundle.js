webpackJsonp(["main"],{

/***/ "../../../../../src/$$_gendir lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_gendir lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<app-overlay>\n  <div class=\"overlay\">\n    <h4>Loading...</h4>\n    <img src=\"/assets/spinner48.svg\"/>\n  </div>\n</app-overlay>\n\n<div style=\"text-align:center\">\n  <h1>\n    Welcome to {{title}}!\n  </h1>\n  <img width=\"300\" src=\"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAyNTAgMjUwIj4KICAgIDxwYXRoIGZpbGw9IiNERDAwMzEiIGQ9Ik0xMjUgMzBMMzEuOSA2My4ybDE0LjIgMTIzLjFMMTI1IDIzMGw3OC45LTQzLjcgMTQuMi0xMjMuMXoiIC8+CiAgICA8cGF0aCBmaWxsPSIjQzMwMDJGIiBkPSJNMTI1IDMwdjIyLjItLjFWMjMwbDc4LjktNDMuNyAxNC4yLTEyMy4xTDEyNSAzMHoiIC8+CiAgICA8cGF0aCAgZmlsbD0iI0ZGRkZGRiIgZD0iTTEyNSA1Mi4xTDY2LjggMTgyLjZoMjEuN2wxMS43LTI5LjJoNDkuNGwxMS43IDI5LjJIMTgzTDEyNSA1Mi4xem0xNyA4My4zaC0zNGwxNy00MC45IDE3IDQwLjl6IiAvPgogIDwvc3ZnPg==\">\n</div>\n\n<p>\n  API URL: {{url}}\n  <br>\n  <a [routerLink]=\"['/']\">Home</a>\n  <a (click)=\"auth()\">Test</a>\n</p>\n<p *ngIf=\"!currentUser\">\n  <a [routerLink]=\"['/login']\">Login</a>\n  <a [routerLink]=\"['/register']\">Register</a>\n</p>\n<p *ngIf=\"currentUser\">\n  <a>{{currentUser.username}}</a>\n  <a (click)=\"logout()\">Logout</a>\n</p>\n\n<app-alert></app-alert>\n\n<div class=\"container\">\n  <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#map {\n  height: 500px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_rest_authentication_service__ = __webpack_require__("../../../../../src/app/services/rest/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = (function () {
    function AppComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.url = __WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].apiUrl;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.authService.user$.subscribe(function (user) { return _this.currentUser = user; });
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    AppComponent.prototype.logout = function () {
        this.authService.logout();
        this.router.navigate(['/']);
    };
    AppComponent.prototype.auth = function () {
        this.authService.auth()
            .subscribe(function (data) {
            console.log(JSON.stringify(data));
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-root',
        template: __webpack_require__("../../../../../src/app/app.component.html"),
        styles: [__webpack_require__("../../../../../src/app/app.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_rest_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_rest_authentication_service__["a" /* AuthenticationService */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__angular_router__["b" /* Router */]) === "function" && _b || Object])
], AppComponent);

var _a, _b;
//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/@angular/platform-browser.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__guards_admin_guard__ = __webpack_require__("../../../../../src/app/guards/admin.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__guards_auth_guard__ = __webpack_require__("../../../../../src/app/guards/auth.guard.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__services_rest_rest_service__ = __webpack_require__("../../../../../src/app/services/rest/rest.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__services_rest_authentication_service__ = __webpack_require__("../../../../../src/app/services/rest/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__services_alert_service__ = __webpack_require__("../../../../../src/app/services/alert.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__services_overlay_service__ = __webpack_require__("../../../../../src/app/services/overlay.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_home_component_home_component__ = __webpack_require__("../../../../../src/app/components/home-component/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_login_component_login_component__ = __webpack_require__("../../../../../src/app/components/login-component/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__angular_forms__ = __webpack_require__("../../../forms/@angular/forms.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__app_routing__ = __webpack_require__("../../../../../src/app/app.routing.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__directives_alert_component__ = __webpack_require__("../../../../../src/app/directives/alert.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__directives_overlay_component__ = __webpack_require__("../../../../../src/app/directives/overlay.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_register_component_register_component__ = __webpack_require__("../../../../../src/app/components/register-component/register.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

















var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["M" /* NgModule */])({
        declarations: [
            __WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */],
            __WEBPACK_IMPORTED_MODULE_9__components_home_component_home_component__["a" /* HomeComponent */],
            __WEBPACK_IMPORTED_MODULE_10__components_login_component_login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_16__components_register_component_register_component__["a" /* RegisterComponent */],
            __WEBPACK_IMPORTED_MODULE_14__directives_alert_component__["a" /* AlertComponent */],
            __WEBPACK_IMPORTED_MODULE_15__directives_overlay_component__["a" /* OverlayComponent */]
        ],
        imports: [
            __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
            __WEBPACK_IMPORTED_MODULE_11__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_12__angular_http__["c" /* HttpModule */],
            __WEBPACK_IMPORTED_MODULE_12__angular_http__["d" /* JsonpModule */],
            __WEBPACK_IMPORTED_MODULE_13__app_routing__["a" /* routing */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_3__guards_admin_guard__["a" /* AdminGuard */],
            __WEBPACK_IMPORTED_MODULE_4__guards_auth_guard__["a" /* AuthGuard */],
            __WEBPACK_IMPORTED_MODULE_5__services_rest_rest_service__["a" /* RestService */],
            __WEBPACK_IMPORTED_MODULE_6__services_rest_authentication_service__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_7__services_alert_service__["a" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_8__services_overlay_service__["a" /* OverlayService */]
        ],
        bootstrap: [__WEBPACK_IMPORTED_MODULE_2__app_component__["a" /* AppComponent */]]
    })
], AppModule);

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ "../../../../../src/app/app.routing.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_home_component_home_component__ = __webpack_require__("../../../../../src/app/components/home-component/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_login_component_login_component__ = __webpack_require__("../../../../../src/app/components/login-component/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_register_component_register_component__ = __webpack_require__("../../../../../src/app/components/register-component/register.component.ts");




var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_1__components_home_component_home_component__["a" /* HomeComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_2__components_login_component_login_component__["a" /* LoginComponent */] },
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_3__components_register_component_register_component__["a" /* RegisterComponent */] },
    { path: '**', redirectTo: '' }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["c" /* RouterModule */].forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map

/***/ }),

/***/ "../../../../../src/app/components/home-component/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"map\"></div>\n"

/***/ }),

/***/ "../../../../../src/app/components/home-component/home.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#map {\n  height: 500px; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/home-component/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_rest_authentication_service__ = __webpack_require__("../../../../../src/app/services/rest/authentication.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var HomeComponent = (function () {
    function HomeComponent(authService) {
        this.authService = authService;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.authService.user$.subscribe(function (user) {
            _this.currentUser = user;
        });
        var props = {
            center: new google.maps.LatLng(51.508742, -0.120850),
            zoom: 5,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(document.getElementById('map'), props);
    };
    HomeComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    return HomeComponent;
}());
HomeComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        template: __webpack_require__("../../../../../src/app/components/home-component/home.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/home-component/home.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_rest_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_rest_authentication_service__["a" /* AuthenticationService */]) === "function" && _a || Object])
], HomeComponent);

var _a;
//# sourceMappingURL=home.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/login-component/login.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"form\">\n  <form class=\"login-form\" name=\"form\" (ngSubmit)=\"f.form.valid && login()\" #f=\"ngForm\" novalidate>\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': !loading && f.submitted && !username.valid }\">\n      <input type=\"text\" class=\"form-control\" name=\"username\" id=\"username-field\" [disabled]=\"loading\"\n             [(ngModel)]=\"model.username\" #username=\"ngModel\" placeholder=\"Korisničko ime\" required/>\n      <p *ngIf=\"!loading && f.submitted && !model.username\" class=\"message\">Korisničko ime je obavezno.</p>\n      <p *ngIf=\"!loading && model.username && !username.valid\" class=\"message\">Korisničko ime sadrži nedozvoljene znakove.</p>\n    </div>\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': !loading && f.submitted && !password.valid }\">\n      <input type=\"password\" class=\"form-control\" name=\"password\" id=\"password-field\" [disabled]=\"loading\"\n             [(ngModel)]=\"model.password\" #password=\"ngModel\" placeholder=\"Šifra\" validateNospace/>\n      <p *ngIf=\"!loading && model.password && !password.valid\" class=\"message\">Šifra sadrži nedozvoljene znakove.</p>\n    </div>\n    <div class=\"form-group\">\n      <button [disabled]=\"loading\" class=\"btn btn-primary\" id=\"login-button\">Uloguj se</button>\n      <img *ngIf=\"loading\" src=\"/assets/spinner32.svg\"/>\n    </div>\n  </form>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/login-component/login.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Form */\n.form {\n  position: relative;\n  z-index: 1;\n  background: #f2f2f2;\n  max-width: 300px;\n  margin: auto;\n  padding: 30px;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n  border-bottom-right-radius: 3px;\n  text-align: center;\n  -ms-flex-item-align: center;\n      -ms-grid-row-align: center;\n      align-self: center; }\n\n.form .thumbnail {\n  background: #333;\n  width: 150px;\n  height: 150px;\n  margin: 0 auto 15px;\n  padding: 50px 30px;\n  border-top-left-radius: 100%;\n  border-top-right-radius: 100%;\n  border-bottom-left-radius: 100%;\n  border-bottom-right-radius: 100%;\n  box-sizing: border-box; }\n\n.form .thumbnail img {\n  display: block;\n  width: 100%; }\n\n.form input {\n  outline: 0;\n  background: #ffffff;\n  width: 100%;\n  border: 0;\n  margin-top: 15px;\n  padding: 15px;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n  border-bottom-right-radius: 3px;\n  box-sizing: border-box;\n  font-size: 14px; }\n\n.form button {\n  outline: 0;\n  background: #333;\n  width: 100%;\n  border: 0;\n  padding: 15px;\n  margin-top: 15px;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n  border-bottom-right-radius: 3px;\n  color: #ffffff;\n  font-size: 14px;\n  transition: all 0.3 ease;\n  cursor: pointer; }\n\n.form button:hover {\n  color: #e3e3e3; }\n\n.form img {\n  margin-top: 15px; }\n\n.form .message {\n  margin: 5px 0 0 0;\n  color: #b3b3b3;\n  font-size: 12px; }\n\n.form .message a {\n  color: #31708f;\n  text-decoration: none; }\n\n.form .register-form {\n  display: none; }\n\n.has-error .message {\n  color: #a94442; }\n\n.has-error input {\n  border: 1px solid #a94442; }\n\n.container {\n  position: relative;\n  z-index: 1;\n  max-width: 300px;\n  margin: 0 auto; }\n\n.container:before, .container:after {\n  content: \"\";\n  display: block;\n  clear: both; }\n\n.container .info {\n  margin: 50px auto;\n  text-align: center; }\n\n.container .info h1 {\n  margin: 0 0 15px;\n  padding: 0;\n  font-size: 36px;\n  font-weight: 300;\n  color: #1a1a1a; }\n\n.container .info span {\n  color: #4d4d4d;\n  font-size: 12px; }\n\n.container .info span a {\n  color: #000000;\n  text-decoration: none; }\n\n.container .info span .fa {\n  color: #a70532; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/login-component/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_rest_authentication_service__ = __webpack_require__("../../../../../src/app/services/rest/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_alert_service__ = __webpack_require__("../../../../../src/app/services/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = (function () {
    function LoginComponent(router, loginService, alertService) {
        this.router = router;
        this.loginService = loginService;
        this.alertService = alertService;
        this.model = {};
    }
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.alertService.clearMessage();
        this.loginService.login(this.model)
            .subscribe(function (data) {
            console.log(data);
            _this.alertService.success('Login successful!', true);
            _this.router.navigate(['/']);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-login',
        template: __webpack_require__("../../../../../src/app/components/login-component/login.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/login-component/login.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_rest_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_rest_authentication_service__["a" /* AuthenticationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_alert_service__["a" /* AlertService */]) === "function" && _c || Object])
], LoginComponent);

var _a, _b, _c;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ "../../../../../src/app/components/register-component/register.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"form\">\n  <form class=\"login-form\" name=\"form\" (ngSubmit)=\"f.form.valid && register()\" #f=\"ngForm\" novalidate>\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': !loading && f.submitted && !firstName.valid }\">\n      <input type=\"text\" class=\"form-control\" name=\"firstName\" id=\"firstName-field\" [disabled]=\"loading\"\n             [(ngModel)]=\"model.firstName\" #firstName=\"ngModel\" placeholder=\"Ime\" required/>\n      <p *ngIf=\"!loading && f.submitted && !model.firstName\" class=\"message\">Ime je obavezno.</p>\n      <p *ngIf=\"!loading && model.firstName && !firstName.valid\" class=\"message\">Ime sadrži nedozvoljene znakove.</p>\n    </div>\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': !loading && f.submitted && !lastName.valid }\">\n      <input type=\"text\" class=\"form-control\" name=\"lastName\" id=\"lastName-field\" [disabled]=\"loading\"\n             [(ngModel)]=\"model.lastName\" #lastName=\"ngModel\" placeholder=\"Prezime\" required/>\n      <p *ngIf=\"!loading && f.submitted && !model.lastName\" class=\"message\">Prezime je obavezno.</p>\n      <p *ngIf=\"!loading && model.lastName && !lastName.valid\" class=\"message\">Prezime sadrži nedozvoljene znakove.</p>\n    </div>\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': !loading && f.submitted && !username.valid }\">\n      <input type=\"text\" class=\"form-control\" name=\"username\" id=\"username-field\" [disabled]=\"loading\"\n             [(ngModel)]=\"model.username\" #username=\"ngModel\" placeholder=\"Korisničko ime\" required/>\n      <p *ngIf=\"!loading && f.submitted && !model.username\" class=\"message\">Korisničko ime je obavezno.</p>\n      <p *ngIf=\"!loading && model.username && !username.valid\" class=\"message\">Korisničko ime sadrži nedozvoljene znakove.</p>\n    </div>\n    <div class=\"form-group\" [ngClass]=\"{ 'has-error': !loading && f.submitted && !password.valid }\">\n      <input type=\"password\" class=\"form-control\" name=\"password\" id=\"password-field\" [disabled]=\"loading\"\n             [(ngModel)]=\"model.password\" #password=\"ngModel\" placeholder=\"Šifra\" validateNospace/>\n      <p *ngIf=\"!loading && model.password && !password.valid\" class=\"message\">Šifra sadrži nedozvoljene znakove.</p>\n    </div>\n    <div class=\"form-group\">\n      <button [disabled]=\"loading\" class=\"btn btn-primary\" id=\"login-button\">Uloguj se</button>\n      <img *ngIf=\"loading\" src=\"/assets/spinner32.svg\"/>\n    </div>\n  </form>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/components/register-component/register.component.scss":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* Form */\n.form {\n  position: relative;\n  z-index: 1;\n  background: #f2f2f2;\n  max-width: 300px;\n  margin: auto;\n  padding: 30px;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n  border-bottom-right-radius: 3px;\n  text-align: center;\n  -ms-flex-item-align: center;\n      -ms-grid-row-align: center;\n      align-self: center; }\n\n.form .thumbnail {\n  background: #333;\n  width: 150px;\n  height: 150px;\n  margin: 0 auto 15px;\n  padding: 50px 30px;\n  border-top-left-radius: 100%;\n  border-top-right-radius: 100%;\n  border-bottom-left-radius: 100%;\n  border-bottom-right-radius: 100%;\n  box-sizing: border-box; }\n\n.form .thumbnail img {\n  display: block;\n  width: 100%; }\n\n.form input {\n  outline: 0;\n  background: #ffffff;\n  width: 100%;\n  border: 0;\n  margin-top: 15px;\n  padding: 15px;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n  border-bottom-right-radius: 3px;\n  box-sizing: border-box;\n  font-size: 14px; }\n\n.form button {\n  outline: 0;\n  background: #333;\n  width: 100%;\n  border: 0;\n  padding: 15px;\n  margin-top: 15px;\n  border-top-left-radius: 3px;\n  border-top-right-radius: 3px;\n  border-bottom-left-radius: 3px;\n  border-bottom-right-radius: 3px;\n  color: #ffffff;\n  font-size: 14px;\n  transition: all 0.3 ease;\n  cursor: pointer; }\n\n.form button:hover {\n  color: #e3e3e3; }\n\n.form img {\n  margin-top: 15px; }\n\n.form .message {\n  margin: 5px 0 0 0;\n  color: #b3b3b3;\n  font-size: 12px; }\n\n.form .message a {\n  color: #31708f;\n  text-decoration: none; }\n\n.form .register-form {\n  display: none; }\n\n.has-error .message {\n  color: #a94442; }\n\n.has-error input {\n  border: 1px solid #a94442; }\n\n.container {\n  position: relative;\n  z-index: 1;\n  max-width: 300px;\n  margin: 0 auto; }\n\n.container:before, .container:after {\n  content: \"\";\n  display: block;\n  clear: both; }\n\n.container .info {\n  margin: 50px auto;\n  text-align: center; }\n\n.container .info h1 {\n  margin: 0 0 15px;\n  padding: 0;\n  font-size: 36px;\n  font-weight: 300;\n  color: #1a1a1a; }\n\n.container .info span {\n  color: #4d4d4d;\n  font-size: 12px; }\n\n.container .info span a {\n  color: #000000;\n  text-decoration: none; }\n\n.container .info span .fa {\n  color: #a70532; }\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/components/register-component/register.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__services_rest_authentication_service__ = __webpack_require__("../../../../../src/app/services/rest/authentication.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__services_alert_service__ = __webpack_require__("../../../../../src/app/services/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegisterComponent = (function () {
    function RegisterComponent(router, loginService, alertService) {
        this.router = router;
        this.loginService = loginService;
        this.alertService = alertService;
        this.model = {};
    }
    RegisterComponent.prototype.register = function () {
        var _this = this;
        this.loading = true;
        this.alertService.clearMessage();
        this.loginService.register(this.model)
            .subscribe(function (data) {
            console.log(data);
            _this.alertService.success('Registration successful!', true);
            _this.router.navigate(['/']);
        }, function (error) {
            _this.alertService.error(error);
            _this.loading = false;
        });
    };
    return RegisterComponent;
}());
RegisterComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-register',
        template: __webpack_require__("../../../../../src/app/components/register-component/register.component.html"),
        styles: [__webpack_require__("../../../../../src/app/components/register-component/register.component.scss")]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__services_rest_authentication_service__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__services_rest_authentication_service__["a" /* AuthenticationService */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_3__services_alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3__services_alert_service__["a" /* AlertService */]) === "function" && _c || Object])
], RegisterComponent);

var _a, _b, _c;
//# sourceMappingURL=register.component.js.map

/***/ }),

/***/ "../../../../../src/app/directives/alert.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"message\"\n     class=\"alert\"\n     [ngClass]=\"{\n         'alert-success': message.type === 'success',\n         'alert-danger': message.type === 'error'\n     }\"\n>\n  — {{message.text}} —\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/directives/alert.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_alert_service__ = __webpack_require__("../../../../../src/app/services/alert.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AlertComponent = (function () {
    function AlertComponent(alertService) {
        this.alertService = alertService;
    }
    AlertComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.alertService.getMessage().subscribe(function (message) {
            _this.message = message;
        });
    };
    return AlertComponent;
}());
AlertComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-alert',
        template: __webpack_require__("../../../../../src/app/directives/alert.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_alert_service__["a" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_alert_service__["a" /* AlertService */]) === "function" && _a || Object])
], AlertComponent);

var _a;
//# sourceMappingURL=alert.component.js.map

/***/ }),

/***/ "../../../../../src/app/directives/overlay.component.html":
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"message\" class=\"overlay\">\n  <h4>{{message.text}}</h4>\n  <img src=\"/assets/spinner48.svg\"/>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/directives/overlay.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OverlayComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_overlay_service__ = __webpack_require__("../../../../../src/app/services/overlay.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OverlayComponent = (function () {
    function OverlayComponent(overlayService) {
        this.overlayService = overlayService;
    }
    OverlayComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.overlayService.getMessage().subscribe(function (message) {
            _this.message = message;
        });
    };
    return OverlayComponent;
}());
OverlayComponent = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["o" /* Component */])({
        selector: 'app-overlay',
        template: __webpack_require__("../../../../../src/app/directives/overlay.component.html")
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_overlay_service__["a" /* OverlayService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_overlay_service__["a" /* OverlayService */]) === "function" && _a || Object])
], OverlayComponent);

var _a;
//# sourceMappingURL=overlay.component.js.map

/***/ }),

/***/ "../../../../../src/app/guards/admin.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AdminGuard = (function () {
    function AdminGuard(router) {
        this.router = router;
    }
    AdminGuard.prototype.canActivate = function () {
        var user = localStorage.getItem('user');
        if (user) {
            var userObj = JSON.parse(user);
            if (userObj.userRole.roleId === 1) {
                return true;
            }
        }
        this.router.navigate(['/']);
        return false;
    };
    return AdminGuard;
}());
AdminGuard = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object])
], AdminGuard);

var _a;
//# sourceMappingURL=admin.guard.js.map

/***/ }),

/***/ "../../../../../src/app/guards/auth.guard.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthGuard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AuthGuard = (function () {
    function AuthGuard(router) {
        this.router = router;
    }
    AuthGuard.prototype.canActivate = function () {
        if (localStorage.getItem('user')) {
            return true;
        }
        this.router.navigate(['/login']);
        return false;
    };
    return AuthGuard;
}());
AuthGuard = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object])
], AuthGuard);

var _a;
//# sourceMappingURL=auth.guard.js.map

/***/ }),

/***/ "../../../../../src/app/services/alert.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("../../../router/@angular/router.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var AlertService = (function () {
    function AlertService(router) {
        var _this = this;
        this.router = router;
        this.subject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.keepAfterNavigationChange = false;
        // clear alert message on route change
        router.events.subscribe(function (event) {
            if (event instanceof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* NavigationStart */]) {
                if (_this.keepAfterNavigationChange) {
                    _this.keepAfterNavigationChange = false;
                }
                else {
                    _this.subject.next();
                }
            }
        });
    }
    AlertService.prototype.success = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'success', text: message });
    };
    AlertService.prototype.fail = function (message, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });
    };
    AlertService.prototype.error = function (error, keepAfterNavigationChange) {
        if (keepAfterNavigationChange === void 0) { keepAfterNavigationChange = false; }
        var message = error.status;
        try {
            var body = JSON.parse(error._body);
            if (body.error) {
                message += ' ' + body.error;
            }
            if (body.message) {
                message += ': ' + body.message;
            }
        }
        catch (Error) {
            message += ': Unknown error.';
        }
        this.keepAfterNavigationChange = keepAfterNavigationChange;
        this.subject.next({ type: 'error', text: message });
    };
    AlertService.prototype.clearMessage = function () {
        this.subject.next();
    };
    AlertService.prototype.getMessage = function () {
        return this.subject.asObservable();
    };
    return AlertService;
}());
AlertService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _a || Object])
], AlertService);

var _a;
//# sourceMappingURL=alert.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/overlay.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OverlayService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__ = __webpack_require__("../../../../rxjs/Subject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var OverlayService = (function () {
    function OverlayService() {
        this.subject = new __WEBPACK_IMPORTED_MODULE_1_rxjs_Subject__["Subject"]();
    }
    OverlayService.prototype.showMessage = function (message) {
        this.subject.next({ text: message });
    };
    OverlayService.prototype.clearMessage = function () {
        this.subject.next();
    };
    OverlayService.prototype.getMessage = function () {
        return this.subject.asObservable();
    };
    return OverlayService;
}());
OverlayService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [])
], OverlayService);

//# sourceMappingURL=overlay.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/rest/authentication.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AuthenticationService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__rest_service__ = __webpack_require__("../../../../../src/app/services/rest/rest.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject__ = __webpack_require__("../../../../rxjs/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject__);
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var AuthenticationService = AuthenticationService_1 = (function (_super) {
    __extends(AuthenticationService, _super);
    function AuthenticationService(http) {
        var _this = _super.call(this, http) || this;
        var user = JSON.parse(localStorage.getItem('user'));
        _this._userSource = new __WEBPACK_IMPORTED_MODULE_5_rxjs_BehaviorSubject__["BehaviorSubject"](user);
        _this.user$ = _this._userSource.asObservable();
        _this.user$.subscribe(function (u) { return _this._user = u; });
        return _this;
    }
    AuthenticationService.prototype.handleResponse = function (res) {
        console.log(res);
        var userData = res.json();
        if (!userData) {
            return;
        }
        var user = userData.user;
        var token = userData.token;
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('token', token);
        this._userSource.next(user);
        return user;
    };
    AuthenticationService.prototype.auth = function () {
        var options = __WEBPACK_IMPORTED_MODULE_3__rest_service__["a" /* RestService */].options();
        return this.http.get(AuthenticationService_1.HOST, options).map(function (res) { return res.json(); });
    };
    AuthenticationService.prototype.login = function (user) {
        var _this = this;
        var body = JSON.stringify(user);
        console.log(body);
        var options = __WEBPACK_IMPORTED_MODULE_3__rest_service__["a" /* RestService */].options();
        return this.http.post(AuthenticationService_1.HOST + "/login", body, options).map(function (res) {
            return _this.handleResponse(res);
        });
    };
    AuthenticationService.prototype.register = function (user) {
        var _this = this;
        var body = JSON.stringify(user);
        console.log(body);
        var options = __WEBPACK_IMPORTED_MODULE_3__rest_service__["a" /* RestService */].options();
        return this.http.post(AuthenticationService_1.HOST + "/register", body, options).map(function (res) {
            return _this.handleResponse(res);
        });
    };
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        this._userSource.next(null);
    };
    return AuthenticationService;
}(__WEBPACK_IMPORTED_MODULE_3__rest_service__["a" /* RestService */]));
AuthenticationService.HOST = __WEBPACK_IMPORTED_MODULE_4__environments_environment__["a" /* environment */].apiUrl + "/auth";
AuthenticationService = AuthenticationService_1 = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], AuthenticationService);

var AuthenticationService_1, _a;
//# sourceMappingURL=authentication.service.js.map

/***/ }),

/***/ "../../../../../src/app/services/rest/rest.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RestService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/@angular/http.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var RestService = (function () {
    function RestService(http) {
        this.http = http;
    }
    RestService.options = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Headers */]();
        headers.append('Content-Type', 'application/json');
        var token = localStorage.getItem('token');
        if (token) {
            headers.append('Authorization', 'Bearer ' + token);
        }
        return new __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* RequestOptions */]({ headers: headers, withCredentials: token != null });
    };
    return RestService;
}());
RestService = __decorate([
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* Injectable */])(),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Http */]) === "function" && _a || Object])
], RestService);

var _a;
//# sourceMappingURL=rest.service.js.map

/***/ }),

/***/ "../../../../../src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
var environment = {
    production: true,
    apiUrl: ''
};
//# sourceMappingURL=environment.js.map

/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/@angular/core.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/@angular/platform-browser-dynamic.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("../../../../../src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_23" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map