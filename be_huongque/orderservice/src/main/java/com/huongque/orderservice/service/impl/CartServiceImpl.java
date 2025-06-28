package com.huongque.orderservice.service.impl;

import com.huongque.orderservice.dto.*;
import com.huongque.orderservice.entity.*;
import com.huongque.orderservice.repository.*;
import com.huongque.orderservice.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class CartServiceImpl implements CartService {
    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;

    @Override
    public CartDto getCartByUserId(UUID userId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) return null;
        return toDto(cart);
    }

    @Override
    public CartDto createCart(UUID userId) {
        Cart cart = new Cart();
        cart.setUserId(userId);
        cart.setCartItems(new ArrayList<>());
        cart = cartRepository.save(cart);
        return toDto(cart);
    }

    @Override
    public void deleteCart(UUID cartId) {
        cartRepository.deleteById(cartId);
    }

    @Override
    public CartItemDto addCartItem(UUID userId, CreateCartItemDto dto) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) cart = cartRepository.save(new Cart(null, userId, new ArrayList<>()));
        CartItem item = CartItem.builder()
                .cart(cart)
                .productId(dto.getProductId())
                .quantity(dto.getQuantity())
                .price(dto.getPrice())
                .productName(dto.getProductName())
                .productImage(dto.getProductImage())
                .build();
        item = cartItemRepository.save(item);
        cart.getCartItems().add(item);
        return toDto(item);
    }

    @Override
    public CartItemDto updateCartItem(UUID userId, UpdateCartItemDto dto) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) throw new RuntimeException("Cart not found");
        Optional<CartItem> opt = cart.getCartItems().stream().filter(i -> i.getId().equals(dto.getId())).findFirst();
        if (opt.isEmpty()) throw new RuntimeException("Cart item not found");
        CartItem item = opt.get();
        item.setQuantity(dto.getQuantity());
        item.setPrice(dto.getPrice());
        item = cartItemRepository.save(item);
        return toDto(item);
    }

    @Override
    public void removeCartItem(UUID userId, UUID cartItemId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) throw new RuntimeException("Cart not found");
        cart.getCartItems().removeIf(i -> i.getId().equals(cartItemId));
        cartItemRepository.deleteById(cartItemId);
    }

    @Override
    public List<CartItemDto> getCartItems(UUID userId) {
        Cart cart = cartRepository.findByUserId(userId);
        if (cart == null) return Collections.emptyList();
        return cart.getCartItems().stream().map(this::toDto).collect(Collectors.toList());
    }

    private CartDto toDto(Cart cart) {
        CartDto dto = new CartDto();
        dto.setId(cart.getId());
        dto.setUserId(cart.getUserId());
        dto.setCartItems(cart.getCartItems() == null ? Collections.emptyList() : cart.getCartItems().stream().map(this::toDto).collect(Collectors.toList()));
        return dto;
    }
    private CartItemDto toDto(CartItem item) {
        CartItemDto dto = new CartItemDto();
        dto.setId(item.getId());
        dto.setProductId(item.getProductId());
        dto.setQuantity(item.getQuantity());
        dto.setPrice(item.getPrice());
        dto.setProductName(item.getProductName());
        dto.setProductImage(item.getProductImage());
        return dto;
    }
}
