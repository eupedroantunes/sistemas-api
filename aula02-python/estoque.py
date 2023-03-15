import requests
import json

api_url = "http://localhost:3001/products"

def incluir():
  print(f"\nInclusão de Produtos")
  print("-"*40)
  description = input("Descrição do Produto: ")
  brand = input("Marca do Produto: ")
  quantity = int(input("Quantidade do Produto: "))
  price = float(input("Preço do Produto: "))

  newProduct = {
    "description": description,
    "brand": brand,
    "quantityStock": quantity,
    "price": price
  }
  headers = {"Content-type": "application/json"}
  response = requests.post(api_url, data=json.dumps(newProduct), headers=headers)
  response.json()
  if response.status_code == 201:
    print("="*30)
    print("Produto inserido com sucesso!")
    print("="*30)
    

def listar():
  response = requests.get(api_url)
  data = response.json()

  print(f"\nListagem de Produtos")
  print("-"*40)
  if len(data) == 0:
    print("Nenhum produto em estoque")
  else:
    print("ID --------- Produto -------------- Marca -------------- Estoque -------------- Preço")
    for key in data:
      print(f'{str(key["id"]):13s}{key["description"]:22s} {key["brand"]:20s} {str(key["quantityStock"]):22s} R$ {key["price"]:<4.2f}')

def alterar():
  response = requests.get(api_url)
  data = response.json()

  listar()
  id = int(input(f'Escolha o ID do Produto que você deseja alterar o preço e a quantidade: '))
  quantity = int(input(f'Qual é a nova quantidade do produto em estoque: '))
  price = float(input(f'Qual é o novo valor do produto: '))
  productUpdate = {}

  for key in data:
    if key["id"] == id:
      productUpdate = {
        "description": key["description"],
        "brand": key["brand"],
        "quantityStock": quantity,
        "price": price
      }
  response = requests.put(f"{api_url}/{id}", json=productUpdate)
  response.json()
  if response.status_code == 200:
    print("="*30)
    print("Produto alterado com sucesso!")
    print("="*30)


def excluir():
  pass

def consultar():
  pass

def estatisticas():
  pass


while True:
  print("\n1. Incluir Produto")
  print("2. Listar Produto")
  print("3. Alterar Produto")
  print("4. Excluir Produto")
  print("5. Consultar Produto")
  print("6. Estatisticas dos Produtos")
  print("7. Finalizar") 

  option = int(input("Opcão: "))

  if option == 1:
    incluir()
  elif option == 2:
    listar()
  elif option == 3:
    alterar()
  elif option == 4:
    excluir()
  elif option == 5:
    consultar()
  elif option == 6:
    estatisticas()
  else:
    break