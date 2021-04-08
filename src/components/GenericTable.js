import React, { useState } from "react";
import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css"; // Import css
import { useHistory } from "react-router-dom";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import FormControl2 from "@material-ui/core/FormControl";

import { Table, Button, InputGroup, FormControl } from "react-bootstrap";

import {
  FiEdit3,
  FiXCircle,
  FiPlus,
  FiSearch,
  FiCheck,
  FiDelete,
} from "react-icons/fi";
import { Dialog } from "@material-ui/core";
import Botao from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { ToastContainer, toast } from "react-toastify";

import ReactTooltip from "react-tooltip";
import "react-toastify/dist/ReactToastify.css";

import "bootstrap/dist/css/bootstrap.min.css";
import { string } from "yup";

const axios = require('axios');
const url = window.location.href.replace("http://localhost:3000/", "");

const GenericTable = ({ data, title }) => {
  const history = useHistory();
  const [open, setOpen] = React.useState(false);
  var itensQuantidade = [];

  const [valueTipoProduto, setTipoProduto] = React.useState("pizza")
  const [valueGeneric, setTipoValueGeneric] = React.useState("pizza")
  const [produtoSelecionado, setProdutoSelecionado] = React.useState({})

  const handleChangePizza = () => {
    setTipoProduto("pizza");
  };

  const handleChangeProduto = () => {
    setTipoProduto("normal");
  };

  const handleChange = (event) => {
    setTipoValueGeneric(event.target.value);
  };

  const toastStyle = {
    position: "top-right",
    autoClose: 1500,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const [end, setEnd] = React.useState(false);

  const endClose = () => {
    setEnd(false);
  };
  const gerenciarFechar = () => {
    setEnd(false);
    setOpen(false);
  };
  const fim = () => {
    setOpen(false);
    setEnd(true);
  };

  const desativarProduto = (item) => {
    console.log('kkkkkkkkk', item)
    if (item.tipo == "Pizza") {
      axios.patch('http://localhost:8080/produtos-finais', {
        nome: item.nome,
        valor: item.valor,
        ingredientes: item.ingredientes,
        ativado: false,
        adicionais: item.adicionais,
        tipo: 'Pizza',
        inicio_promo: item.inicioPromo,
        fim_promo: item.fimPromo,
        valor_promocional: item.valorPromocional ?? '',

      }).then(result => {
        toast.success("🍕 Produto desativado com sucesso!", {
          toastStyle,
        })
      })
        .catch(error => {
          if (error.response?.data) {
            toast.error(error.response.data.message, {
              toastStyle,
            })
            toast.error(error.response.data.details, {
              toastStyle,
            })
          }
          else {
            toast.error('Ocorrou um erro ao desativar o produto, tente novamente!', { toastStyle, })
          }

        })
    }
    else {
      axios.patch('http://localhost:8080/produtos-finais', {
        nome: item.nome,
        valor: item.valor,
        ativado: false,
        peso: item.peso,
        inicio_promo: item.inicioPromo,
        fim_promo: item.fimPromo,
        valor_promocional: item.valorPromocional ?? '',
        tipo: 'Normal'
      })
        .then(function (response) {
          toast.success("🍕 Produto desativado com sucesso!", {
            toastStyle,
          })
        })
        .catch(function (error) {
          if (error.response?.data) {
            toast.error(error.response.data.message, {
              toastStyle,
            })
            toast.error(error.response.data.details, {
              toastStyle,
            })
          }
          else {
            toast.error('Ocorrou um erro ao desativar o produto, tente novamente!', { toastStyle, })
          }

        });
    }
  }


  const handleClose = (url) => {
    setOpen(false);

    if (url === "funcionarios") {
      toast.success("🍕 Registro deletado com sucesso!", {
        toastStyle,
      });
    } else if (url === "estoque") {
      toast.success("🍕 Produto removido do estoque com sucesso!", {
        toastStyle,
      });
    }
    else if (url === 'pedidos') {
      toast.success("🍕 Pedido removido com sucesso!", {
        toastStyle,
      });
    }
  };

  const handleError = () => {
    toast.error("🍕 Produto não pode ser removido: Quantidade maior que zero!");
  };

  const handleEdit = (item) => {
    {
      url === "pedidos" &&
        history.push("/gerenciar-pedido", { tipo: "Editar", item: item });
    }
    {
      url === "clientes" && history.push("/");
    }
    {
      url === "produtos" &&
        history.push("/gerenciar-produto", { tipo: "Editar", item: item });
    }
    {
      url === "estoque" && history.push("/editar-estoque");
    }
    {
      url === "funcionarios" && history.push("/editar-funcionario");
    }
  };

  const formataData = (data) => {
    const novaData = new Date(data);
    return (
      ("0" + (novaData.getDate() + 1)).slice(-2) +
      "/" +
      ("0" + (novaData.getMonth() + 1)).slice(-2) +
      "/" +
      novaData.getFullYear()
    );
  };

  const getProdutosPedido = (produtosArray) => {
    let stringProdutos = "";
    for (var i = 0; i < produtosArray.length; i++) {
      stringProdutos += produtosArray[i].quantidade;
      stringProdutos += " ";
      stringProdutos += produtosArray[i].nome;
      if (i < produtosArray.length - 1) stringProdutos += ",\n";
    }
    return stringProdutos;
  };

  const direcionarCadastro = () => {
    {
      url === "pedidos" &&
        history.push("/gerenciar-pedido", { tipo: "Cadastro" });
    }
    {
      url === "clientes" && history.push("/funcionario-cadastrar-cliente");
    }
    {
      url === "produtos" &&
        confirmAlert({
          title: "Escolher tipo",
          message: "Selecione o tipo de produto que deseja cadastrar",
          buttons: [
            {
              label: "Pizza",
              onClick: () =>
                history.push("/gerenciar-produto", {
                  tipo: "Cadastro",
                  tipoProduto: "Pizza",
                }),
            },
            {
              label: "Normal",
              onClick: () =>
                history.push("/gerenciar-produto", {
                  tipo: "Cadastro",
                  tipoProduto: "Normal",
                }),
            },
          ],
        });
    }
    {
      url === "estoque" && history.push("/cadastrar-estoque");
    }
    {
      url === "funcionarios" && history.push("/cadastrar-funcionario");
    }
  };

  return (
    <>
      {/* <InputGroup className="col-3 mb-3">
        <InputGroup.Prepend>
          <InputGroup.Text id="basic-addon1">
            <FiSearch size={18} color="#000" />
          </InputGroup.Text>
        </InputGroup.Prepend>

        <FormControl
          placeholder={`Buscar ${title}`}
          aria-label="Username"
          aria-describedby="basic-addon1"
        />
      </InputGroup> */}

      {url === "produtos" && (
        <FormControl2 style={{ margin: 10 }} component="RadioTipoProduto">
          <FormLabel>Escolha o tipo do produto</FormLabel>
          <RadioGroup
            aria-label="TipoProduto"
            name="TipoProduto"
            value={valueGeneric}
            onChange={handleChange}
          >
            <FormControlLabel
              control={<Radio />}
              value="pizza"
              label="Pizza"
              onChange={handleChangePizza}
            />
            <FormControlLabel
              control={<Radio />}
              value="normal"
              label="Normal"
              onChange={handleChangeProduto}
            />
          </RadioGroup>
        </FormControl2>
      )}
      <Table striped bordered hover>
        {url === "pedidos" && (
          <>
            <thead>
              <tr>
                <th>Data</th>
                <th>Hora</th>
                <th>ID</th>
                <th>Status</th>
                <th>Descrição</th>
                <th>Valor</th>
                <th>Observações</th>
                <th>Pagamento</th>
                <th>Pago</th>
                <th>Expedição</th>
                <th>Endereço</th>
                <th>CPF Cliente</th>
                <th>CPF NF</th>
                <th>Ações</th>
              </tr>
            </thead>
            {data.map((item) => (
              <tbody>
                <tr>
                  <td>{formataData(item.data)}</td>
                  <td>{item.hora}</td>
                  <td style={{ width: 150, wordBreak: "break-word" }}>
                    {item._id}
                  </td>
                  <td>{item.statusPedido}</td>
                  <td style={{ whiteSpace: "pre-wrap" }}>
                    {getProdutosPedido(item.produtos)}
                  </td>
                  <td>R${item.valor}</td>
                  <td>{item.observacoes}</td>
                  <td>{item.formaPagamento}</td>
                  <td>{item.statusPagamento}</td>
                  <td>{item.formaExpedicao}</td>
                  <td>{item.endereco}</td>
                  <td>{item.cpfCliente}</td>
                  <td>{item.cpfNF}</td>
                  <td>
                    <Button
                      variant="light"
                      style={{
                        marginRight: 7,
                        borderWidth: 1,
                        borderColor: "black",
                      }}
                      onClick={(value) => handleEdit(item)}
                    >
                      <FiEdit3 size={20} color="#black" />
                    </Button>
                    <Button variant="danger" onClick={() => setOpen(true)}>
                      <FiXCircle size={20} color="#black" />
                    </Button>
                  </td>
                </tr>
              </tbody>
            ))}
            <Dialog open={open} onClose={handleClose}>
              <DialogTitle id="alert-dialog-apagar">
                {"Deseja cancelar o pedido?"}
              </DialogTitle>
              <DialogActions>
                <Button
                  variant="danger"
                  className="botao"
                  color="primary"
                  onClick={() => setOpen(false)}
                >
                  Não
                </Button>

                <Button
                  className="botao"
                  variant="success"
                  onClick={() => handleClose("pedidos")}
                  color="primary"
                  autoFocus
                >
                  Sim
                </Button>
              </DialogActions>
            </Dialog>
          </>
        )}
        {console.log(url)}
        {url === "clientes" && (
          <>
            <thead>
              <tr>
                <td>ID</td>
                <td>CPF</td>
                <td>Nome</td>
                <td>Endereco</td>
                <td>Email</td>
                <td>Telefone</td>
                <td>Ações</td>
              </tr>
            </thead>
            {data.map((item) => (
              <tbody>
                <tr>
                  <td>{item.id}</td>
                  <td>{item.cpf}</td>
                  <td>{item.nome}</td>
                  <td>{item.endereco}</td>
                  <td>{item.email}</td>
                  <td>{item.telefone}</td>

                  <td>
                    <Button
                      variant="light"
                      style={{
                        marginRight: 7,
                        borderWidth: 1,
                        borderColor: "black",
                      }}
                      onClick={handleClickOpen}
                    >
                      <FiEdit3 size={20} color="#black" />
                    </Button>
                    <Button
                      variant="danger"
                      data-tip="Desativar"
                      onClick={(value) => { }}
                    >
                      <ReactTooltip />
                      <FiXCircle size={20} color="#black" />
                    </Button>
                  </td>
                </tr>
                <Dialog
                  open={open}
                  onClose={gerenciarFechar}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">
                    Editar as informações do cliente
                  </DialogTitle>
                  <DialogContent>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Nome"
                      type="name"
                      fullWidth
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Endereço"
                      type="name"
                      fullWidth
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Email"
                      type="email"
                      fullWidth
                    />
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Telefone"
                      type="name"
                      fullWidth
                    />
                  </DialogContent>
                  <DialogActions>
                    <Botao onClick={gerenciarFechar} color="primary">
                      Cancel
                    </Botao>
                    <Botao onClick={fim} color="primary">
                      Alterar
                    </Botao>
                  </DialogActions>
                </Dialog>
                <Dialog
                  open={end}
                  onClose={endClose}
                  aria-labelledby="alert-dialog-title"
                  aria-describedby="alert-dialog-description"
                >
                  <DialogTitle id="alert-dialog-title">
                    {"Os dados foram alterados com sucesso!  "}
                    <FiCheck size={35} color={"green"}></FiCheck>
                  </DialogTitle>

                  <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                      Dados alterados com sucesso.
                    </DialogContentText>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={endClose} color="primary" autoFocus>
                      Ok
                    </Button>
                  </DialogActions>
                </Dialog>
              </tbody>
            ))}
          </>
        )}

        {url === "produtos" && (
          <>
            {valueTipoProduto === "pizza" && (
              <>
                <thead>
                  <tr>
                    <td>Tipo</td>
                    <td>Código</td>
                    <td>Nome</td>
                    <td>Valor</td>
                    <td>Ingredientes</td>
                    <td>Adicionais</td>
                    <td>Valor promocional</td>
                    <td>Início da promoção</td>
                    <td>Fim da promoção</td>
                    <td>Ações</td>
                  </tr>
                </thead>
                {data.map((item) => {
                  if (item.tipo === "Pizza") {
                    return (
                      <tbody>
                        <tr>
                          <td>{item.tipo}</td>
                          <td>{item.codigo}</td>
                          <td>{item.nome}</td>
                          <td>{item.valor}</td>
                          <td>{item.ingredientes}</td>
                          <td>{item.adicionais}</td>
                          <td>{item.valorPromocional}</td>
                          <td>{item.inicioPromo}</td>
                          <td>{item.fimPromo}</td>
                          <td>
                            <Button
                              onClick={(value) => handleEdit(item)}
                              variant="light"
                              data-tip="Editar"
                              style={{
                                marginBottom: 10,
                                marginRight: 7,
                                borderWidth: 1,
                                borderColor: "black",
                              }}
                            >
                              <ReactTooltip />
                              <FiEdit3 size={20} color="#black" />
                            </Button>
                            <Button variant="danger" data-tip="Desativar" onClick={value => desativarProduto(item)}>
                              <ReactTooltip />
                              <FiXCircle size={20} color="#black" />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  }
                })}
              </>
            )}
            {valueTipoProduto === "normal" && (
              <>
                <thead>
                  <tr>
                    <td>Tipo</td>
                    <td>Código</td>
                    <td>Nome</td>
                    <td>Valor</td>
                    <td>Peso</td>
                    <td>Status</td>
                    <td>Valor promocional</td>
                    <td>Início da promoção</td>
                    <td>Fim da promoção</td>
                    <td>Ações</td>
                  </tr>
                </thead>
                {data.map((item) => {
                  if (item.tipo === "Normal") {
                    return (
                      <tbody>
                        <tr>
                          <td>{item.tipo}</td>
                          <td>{item.codigo}</td>
                          <td>{item.nome}</td>
                          <td>{item.valor}</td>
                          <td>{item.peso}</td>
                          <td>{item.status}</td>
                          <td>{item.valorPromicional}</td>
                          <td>{item.inicioPromo}</td>
                          <td>{item.fimPromo}</td>
                          <td>
                            <Button
                              onClick={(value) => handleEdit(item)}
                              variant="light"
                              data-tip="Editar"
                              style={{
                                marginRight: 7,
                                borderWidth: 1,
                                borderColor: "black",
                              }}
                            >
                              <ReactTooltip />
                              <FiEdit3 size={20} color="#black" />
                            </Button>
                            <Button variant="danger" data-tip="Desativar" onClick={value => desativarProduto(item)}>
                              <ReactTooltip />
                              <FiXCircle size={20} color="#black" />
                            </Button>
                          </td>
                        </tr>
                      </tbody>
                    );
                  }
                })}
              </>
            )}
          </>
        )
        }
        <FiPlus size={26} color="fff" />
        {
          url === "estoque" && (
            <>
              <thead>
                <tr>
                  <td>Cod</td>
                  <td>Nome</td>
                  <td>Marca</td>
                  <td>Quantidade</td>
                  <td>Valor do item</td>
                  <td>Peso do item</td>
                  <td>Data de validade</td>
                  <td>Data de fabricação</td>
                  <td>Ações</td>
                </tr>
              </thead>
              {data.map((item) => (
                <tbody>
                  <tr>
                    <td>{item.codigo}</td>
                    <td>{item.nome}</td>
                    <td>{item.marca}</td>
                    <td>{item.quantidade}</td>
                    <td>{item.valor}</td>
                    <td>{item.peso}</td>
                    <td>{item.validade}</td>
                    <td>{item.fabricacao}</td>
                    <td>
                      <Button
                        variant="light"
                        style={{
                          marginRight: 7,
                          borderWidth: 1,
                          borderColor: "black",
                        }}
                        onClick={handleEdit}
                      >
                        <FiEdit3 size={20} color="#black" />
                      </Button>
                      <Button variant="danger" onClick={handleClickOpen}>
                        <FiXCircle size={20} color="#black" />
                      </Button>
                      <Dialog open={open} onClose={handleClose}>
                        <DialogTitle id="alert-dialog-apagar">
                          {"Deseja realmente remover o produto do estoque?"}
                        </DialogTitle>
                        <DialogActions>
                          <Button
                            variant="danger"
                            className="botao"
                            onClick={() => setOpen(false)}
                            onClick={handleClose}
                            color="primary"
                          >
                            Não
                        </Button>
                          <Button
                            className="botao"
                            variant="success"
                            onClick={() => handleClose("estoque")}
                            color="primary"
                            autoFocus
                          >
                            Sim
                        </Button>
                        </DialogActions>
                      </Dialog>
                    </td>
                  </tr>
                </tbody>
              ))}
            </>
          )
        }
        {
          url === "funcionarios" && (
            <>
              <thead>
                <tr>
                  <td>Nome</td>
                  <td>CPF</td>
                  <td>RG</td>
                  <td>Carteira de trabalho</td>
                  <td>CEP</td>
                  <td>Endereço</td>
                  <td>Complemento</td>
                  <td>Ações</td>
                </tr>
              </thead>
              {data.map((item) => (
                <tbody>
                  <tr>
                    <td>{item.nome}</td>
                    <td>{item.cpf}</td>
                    <td>{item.rg}</td>
                    <td>{item.carteira_trabalho}</td>
                    <td>{item.cep}</td>
                    <td>{item.endereco}</td>
                    <td>{item.complemento}</td>
                    <td>
                      <Button
                        variant="light"
                        style={{
                          marginRight: 7,
                          borderWidth: 1,
                          borderColor: "black",
                        }}
                        onClick={handleEdit}
                      >
                        <FiEdit3 size={20} color="#black" />
                      </Button>
                      <Button variant="danger" onClick={handleClickOpen}>
                        <FiXCircle
                          size={20}
                          color="#black"
                        // onclick={deleteItem(item.quantidade)}
                        />
                      </Button>
                      <Dialog open={open} onClose={handleClose}>
                        <DialogTitle id="alert-dialog-apagar">
                          {
                            "Deseja realmente deletar os registros do funcionário?"
                          }
                        </DialogTitle>
                        <DialogActions>
                          <Button
                            variant="danger"
                            className="botao"
                            onClick={() => setOpen(false)}
                            onClick={handleClose}
                            color="primary"
                          >
                            Não
                        </Button>

                          <Button
                            className="botao"
                            variant="success"
                            onClick={() => handleClose("funcionarios")}
                            color="primary"
                            autoFocus
                          >
                            Sim
                        </Button>
                        </DialogActions>
                      </Dialog>
                    </td>
                  </tr>
                </tbody>
              ))}
            </>
          )
        }
      </Table >
      <Button variant="success" onClick={direcionarCadastro}>
        <FiPlus size={26} color="fff" />
        Adicionar
      </Button>
      <ToastContainer />
    </>
  );
};

export default GenericTable;
