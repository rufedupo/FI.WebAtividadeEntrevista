using System.ComponentModel.DataAnnotations;
using WebAtividadeEntrevista.Validations;

namespace WebAtividadeEntrevista.Models
{
    /// <summary>
    /// Classe de Modelo de Cliente
    /// </summary>
    public class BeneficiarioModel
    {
        public long Id { get; set; }

        /// <summary>
        /// Nome
        /// </summary>
        [Required]
        public string Nome { get; set; }

        /// <summary>
        /// CPF
        /// </summary>
        [Required]
        [CustomValidationCPF(ErrorMessage = "CPF inválido")]
        public string CPF { get; set; }
    }    
}