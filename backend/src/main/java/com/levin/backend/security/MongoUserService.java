package com.levin.backend.security;

import com.levin.backend.service.IdService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;


@Service
@RequiredArgsConstructor
public class MongoUserService implements UserDetailsService {

    private final MongoUserRepository mongoUserRepository;
    private final IdService idService;

    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        MongoUser mongoUser = mongoUserRepository.findMongoUserByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User with name: " + username + " not found!"));

        return User.builder()
                .username(mongoUser.username())
                .password(mongoUser.password())
                .authorities(Collections.emptyList())
                .build();
    }

    public MongoUser findCurrentUser() {
        return findMongoUserByUsername(SecurityContextHolder.getContext().getAuthentication().getName());
    }

    public MongoUser findMongoUserByUsername(String username) {
        return mongoUserRepository.findMongoUserByUsername(username)
                .orElseGet(() ->
                        new MongoUser("", "anonymousUser", "", "", "")
                );
    }

    public MongoUser saveUser(MongoUser user) {
        String newId = idService.createId();
        MongoUser newUser = new MongoUser(
                newId,
                user.username(),
                passwordEncoder.encode(user.password()),
                user.flatmateId(),
                user.communityId()
        );
        return mongoUserRepository.save(newUser);
    }
}






