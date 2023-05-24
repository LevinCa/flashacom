package com.levin.backend.security;

import jakarta.servlet.http.HttpSession;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {

    private final MongoUserService userService;

    @GetMapping("me")
    public MongoUserDTO getMe() {
        return userService.findMongoUserByUsername(SecurityContextHolder
                        .getContext()
                        .getAuthentication()
                        .getName())
                .withoutPassword();
    }

    @PostMapping
    public MongoUserDTO loginUser() {
        MongoUser user = userService.findMongoUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
        return new MongoUserDTO(user.id(), user.username(), user.flatmateId(), user.communityId());
    }

    @PostMapping("logout")
    public void logout(HttpSession httpSession) {
        httpSession.invalidate();
        SecurityContextHolder.clearContext();
    }

    @PostMapping("signup")
    public ResponseEntity<MongoUser> signUp(@RequestBody MongoUser user) {
        return new ResponseEntity<>(userService.saveUser(user), HttpStatus.CREATED);
    }

}
