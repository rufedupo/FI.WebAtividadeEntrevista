using FI.AtividadeEntrevista.BLL;
using WebAtividadeEntrevista.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using FI.AtividadeEntrevista.DML;
using WebAtividadeEntrevista.Utils;

namespace WebAtividadeEntrevista.Controllers
{
    public class BeneficiarioController : Controller
    {
        [HttpPost]
        public JsonResult AddBeneficiario(BeneficiarioModel model)
        {
            BoBeneficiario bo = new BoBeneficiario();

            if (!this.ModelState.IsValid)
            {
                List<string> erros = (from item in ModelState.Values
                                      from error in item.Errors
                                      select error.ErrorMessage).ToList();

                Response.StatusCode = 400;
                return Json(string.Join(Environment.NewLine, erros));
            }
            else
            {
                try
                {
                    if (!bo.VerificarExistencia(model.CPF))
                    {
                        model.Id = bo.Incluir(new Beneficiario()
                        { 
                            Nome = model.Nome,
                            CPF = model.CPF
                        });

                        return Json(ClienteMsg.INF0001);
                    }
                    else
                        throw new Exception(ClienteMsg.EXC0001);
                }
                catch (Exception ex)
                {
                    Response.StatusCode = 400;

                    List<string> erros = new List<string>();
                    erros.Add(ex.Message);
                    return Json(string.Join(Environment.NewLine, erros));
                }
            }
        }
    }
}