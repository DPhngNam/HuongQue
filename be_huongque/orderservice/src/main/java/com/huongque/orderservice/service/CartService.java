package com.huongque.orderservice.service;

import com.huongque.orderservice.dto.CartDto;
import com.huongque.orderservice.dto.CartItemDto;
import com.huongque.orderservice.dto.CreateCartItemDto;
import com.huongque.orderservice.dto.UpdateCartItemDto;
import java.util.List;
import java.util.UUID;

public interface CartService {
    CartDto getCartByUserId(UUID userId);
    CartDto createCart(UUID userId);
    void deleteCart(UUID cartId);

    CartItemDto addCartItem(UUID userId, CreateCartItemDto dto);
    CartItemDto updateCartItem(UUID userId, UpdateCartItemDto dto);
    void removeCartItem(UUID userId, UUID cartItemId);
    List<CartItemDto> getCartItems(UUID userId);
}
