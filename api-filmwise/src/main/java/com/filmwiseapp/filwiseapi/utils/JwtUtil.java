package com.filmwiseapp.filwiseapi.utils;


import java.util.Date;
import java.security.Key;

import com.filmwiseapp.filwiseapi.model.User;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

public class JwtUtil {
    
    private static String secretKey = "Somos el mejor equipooo del mundo mundial ;)";
    
    private static final Key key = Keys.hmacShaKeyFor(secretKey.getBytes());
    
    public static String generateToken(User user) {
        return Jwts.builder().setSubject(user.getEmail()).claim("rol", user.getRol()).setExpiration(new Date(System.currentTimeMillis() + 3600000)).signWith(key, SignatureAlgorithm.HS256).compact();   
    }

    public static boolean validateToken(String token) {
        try {
            Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);            
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
