import json
from sentence_transformers import SentenceTransformer, util
from transformers import pipeline

with open("products.json", "r", encoding="utf-8") as f:
    products = json.load(f)

search_model = SentenceTransformer("keepitreal/vietnamese-sbert")
product_texts = [
    f"{p.get('name', '')} - {p.get('description', '')}" for p in products
]
product_embeddings = search_model.encode(product_texts, convert_to_tensor=True)

qa = pipeline("question-answering", model="nguyenvulebinh/vi-mrc-base")

def find_best_product(user_input):
    query_embedding = search_model.encode(user_input, convert_to_tensor=True)
    scores = util.pytorch_cos_sim(query_embedding, product_embeddings)
    best_idx = scores.argmax().item()
    return products[best_idx]

def generate_response(user_input):
    product = find_best_product(user_input)
    name = product.get("name", "Sản phẩm")
    description = product.get("description", "Không có mô tả")
    price = product.get("price", "Không rõ")
    sizes = product.get("sizes", [])
    stock = product.get("stock", "Không rõ")
    context = f"{description}. Giá: {price} VNĐ. Size: {', '.join(sizes) if sizes else 'Không rõ'}. Tồn kho: {stock}."
    
    user_input_lower = user_input.lower()
    if "giá" in user_input_lower:
        return f"Giá của '{name}' là {price} VNĐ."
    elif "size" in user_input_lower or "kích cỡ" in user_input_lower:
        return f"Kích cỡ có sẵn cho '{name}': {', '.join(sizes) if sizes else 'Không rõ'}."
    elif "còn" in user_input_lower or "hàng" in user_input_lower:
        return f"Hiện còn {stock} sản phẩm '{name}'."
    else:
        result = qa(question=user_input, context=context)
        return result.get("answer", "Xin lỗi, tôi chưa có thông tin cho câu hỏi này.")
