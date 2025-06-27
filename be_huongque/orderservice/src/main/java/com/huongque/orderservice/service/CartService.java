package com.huongque.orderservice.service;

import com.huongque.orderservice.dto.CartDto;
import com.huongque.orderservice.dto.CartItemDto;
import com.huongque.orderservice.dto.CreateCartItemDto;
import com.huongque.orderservice.dto.UpdateCartItemDto;
import java.util.List;
import java.util.UUID;

public interface CartService {
    CartDto getCartByUserId(Long userId);
    CartDto createCart(Long userId);
    void deleteCart(UUID cartId);

    CartItemDto addCartItem(Long userId, CreateCartItemDto dto);
    CartItemDto updateCartItem(Long userId, UpdateCartItemDto dto);
    void removeCartItem(Long userId, UUID cartItemId);
    List<CartItemDto> getCartItems(Long userId);
}
