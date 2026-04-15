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

    public static boolean validateToken(String token, String requiredRol) {
        try {
            Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
            String rol = claims.get("rol", String.class);  
            System.out.println(rol);
            //Comprobamos el rol
            if (requiredRol != null && !requiredRol.equals(rol)) return false;
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    //Por ejemplo en cada endpoint asi:
    /*
    @PostMapping("/missions")
    public ResponseEntity<?> getUserMissions(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody NameRequest nameRequest) {

        String token = authHeader.replace("Bearer ", "");

        // Validar token y rol
        if (!JwtUtil.validateToken(token, "USER")) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No tienes permisos");
        }

        List<MissionResponse> missions = repo.findUserMissions(nameRequest.getName());
        return ResponseEntity.ok(missions);
    }
    */

    //luego en cada fetch de react:
    /*
    const token = localStorage.getItem("token");

    const response = await fetch("http://localhost:8080/missions", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name: "Francisco" })
    });
    */

    /* EN EL FRONTEND
    if (decoded.rol !== "ADMIN") {
    return <Navigate to="/no-autorizado" />;
    } */

}
