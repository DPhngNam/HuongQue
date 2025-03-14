package com.huongque.authservice.config;

import io.jsonwebtoken.Jwts;

import java.util.Date;

public class JwtUtils {

    private final String SECRET_KEY = "secret";

    public String generateAccessToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 10))
                .signWith(io.jsonwebtoken.SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();
    }
    public String generateRefreshToken( String username){
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60*24*7))
                .signWith(io.jsonwebtoken.SignatureAlgorithm.HS512, SECRET_KEY)
                .compact();

    }

    public String extractUsername(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean isTokenValid(String authToken) {
        try{
            Jwts.parser().setSigningKey(SECRET_KEY).build().parseClaimsJws(authToken);
            return true;
        }
        catch(Exception e){
            return false;

        }
    }
}
