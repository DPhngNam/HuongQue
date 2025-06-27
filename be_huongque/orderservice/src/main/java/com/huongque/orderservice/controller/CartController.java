package com.huongque.orderservice.controller;

import com.huongque.orderservice.dto.*;
import com.huongque.orderservice.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/carts")
@RequiredArgsConstructor
public class CartController {
    private final CartService cartService;

    @GetMapping("/user/{userId}")
    public ResponseEntity<CartDto> getCart(@PathVariable Long userId) {
        CartDto cart = cartService.getCartByUserId(userId);
        if (cart == null) return ResponseEntity.notFound().build();
        return ResponseEntity.ok(cart);
    }

    @PostMapping("/user/{userId}")
    public ResponseEntity<CartDto> createCart(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.createCart(userId));
    }

    @DeleteMapping("/{cartId}")
    public ResponseEntity<Void> deleteCart(@PathVariable UUID cartId) {
        cartService.deleteCart(cartId);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/user/{userId}/items")
    public ResponseEntity<CartItemDto> addCartItem(@PathVariable Long userId, @RequestBody CreateCartItemDto dto) {
        return ResponseEntity.ok(cartService.addCartItem(userId, dto));
    }

    @PutMapping("/user/{userId}/items")
    public ResponseEntity<CartItemDto> updateCartItem(@PathVariable Long userId, @RequestBody UpdateCartItemDto dto) {
        return ResponseEntity.ok(cartService.updateCartItem(userId, dto));
    }

    @DeleteMapping("/user/{userId}/items/{cartItemId}")
    public ResponseEntity<Void> removeCartItem(@PathVariable Long userId, @PathVariable UUID cartItemId) {
        cartService.removeCartItem(userId, cartItemId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/user/{userId}/items")
    public ResponseEntity<List<CartItemDto>> getCartItems(@PathVariable Long userId) {
        return ResponseEntity.ok(cartService.getCartItems(userId));
    }
}
