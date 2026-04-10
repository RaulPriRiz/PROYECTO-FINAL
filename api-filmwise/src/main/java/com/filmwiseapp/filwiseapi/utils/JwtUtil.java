package com.filmwiseapp.filwiseapi.utils;

import io.jsonwebtoken.Claims;
import java.security.Key;
import com.filmwiseapp.filwiseapi.model.User;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

public class JwtUtil {
    
    private static String secretKey = "Somos el mejor equipo del mundoooo ;)";
    
    private static final Key key = Keys.hmacShaKeyFor(secretKey.getBytes());
     

    public static String generateToken(User user) {
        return Jwts.builder().setSubject(user.getEmail()).claim("rol", user.getRol()).signWith(key).compact();   
    }

    
    public static boolean validateToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
            String rol = claims.get("rol", String.class); //falta por hacer            
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
