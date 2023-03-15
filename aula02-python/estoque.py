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
  print(f"\nListagem de Produtos")
  print("-"*40)
  response = requests.get(api_url)
  print(response.json())

def alterar():
  pass

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