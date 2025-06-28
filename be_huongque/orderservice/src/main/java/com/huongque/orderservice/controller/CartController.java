package com.huongque.orderservice.controller;

import com.huongque.orderservice.dto.*;
import com.huongque.orderservice.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @GetMapping("/user")
    public ResponseEntity<CartDto> getCart(@RequestHeader("X-User-Id") String userId) {
        UUID userUUID = UUID.fromString(userId);
        CartDto cart = cartService.getCartByUserId(userUUID);
        if (cart == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/user")
    public ResponseEntity<CartDto> createCart(@RequestHeader("X-User-Id") String userId) {
        UUID userUUID = UUID.fromString(userId);
        return ResponseEntity.ok(cartService.createCart(userUUID));
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<Void> deleteCart(@RequestHeader("X-User-Id") String userId,@PathVariable UUID cartId) {
        cartService.deleteCart(cartId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/user/items")
    public ResponseEntity<CartItemDto> addCartItem(@RequestHeader("X-User-Id") String userId, @RequestBody CreateCartItemDto dto) {
        UUID userUUID = UUID.fromString(userId);
        return ResponseEntity.ok(cartService.addCartItem(userUUID, dto));
    }

    @PutMapping("/user/items")
    public ResponseEntity<CartItemDto> updateCartItem(@RequestHeader("X-User-Id") String userId, @RequestBody UpdateCartItemDto dto) {
        UUID userUUID = UUID.fromString(userId);
        return ResponseEntity.ok(cartService.updateCartItem(userUUID, dto));
    }

    @DeleteMapping("/user/items/{cartItemId}")
    public ResponseEntity<Void> removeCartItem(@RequestHeader("X-User-Id") String userId, @PathVariable UUID cartItemId) {
        UUID userUUID = UUID.fromString(userId);
        cartService.removeCartItem(userUUID, cartItemId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/user/items")
    public ResponseEntity<List<CartItemDto>> getCartItems(@RequestHeader("X-User-Id") String userId) {
        UUID userUUID = UUID.fromString(userId);
        return ResponseEntity.ok(cartService.getCartItems(userUUID));
    }
}
