package com.mrvelibor.mapasveta.controller.rest;

import com.mrvelibor.mapasveta.model.common.enums.UserType;
import com.mrvelibor.mapasveta.model.user.User;
import com.mrvelibor.mapasveta.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping(path = "/users")
public class UserRestController {
    @Autowired
    private UserService userService;

    @GetMapping(value = "{userId}")
    public ResponseEntity<User> getUser(@PathVariable Long userId) {
        User user = userService.getUser(userId);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(user);
    }

    @GetMapping(value = "")
    public ResponseEntity<List<User>> getAllUsers(Principal principal) {
        User currentUser = userService.loadUserByUsername(principal.getName());
        if (currentUser.getType() != UserType.admin) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping(value = "{userId}")
    public ResponseEntity<User> editUser(@PathVariable Long userId, @RequestBody User user, Principal principal) {
        User oldUser = userService.getUser(userId);
        User currentUser = userService.loadUserByUsername(principal.getName());
        if (oldUser == null || (currentUser.getType() != UserType.admin && !currentUser.getId().equals(oldUser.getId()))) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        user.setId(oldUser.getId());
        user = userService.editUser(user);
        return ResponseEntity.ok(user);
    }

    @DeleteMapping(value = "{userId}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable Long userId, Principal principal) {
        User currentUser = userService.loadUserByUsername(principal.getName());
        if (currentUser.getType() != UserType.admin) {
            return new ResponseEntity<>(HttpStatus.FORBIDDEN);
        }
        User user = userService.getUser(userId);
        if (user == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        boolean deleted = userService.deleteUser(user);
        return ResponseEntity.ok(deleted);
    }
}
