﻿CREATE PROC FI_SP_AltBeneficiario
    @NOME          VARCHAR (50),
	@CPF           VARCHAR (11),
	@Id           BIGINT
AS
BEGIN
	UPDATE CLIENTES 
	SET 
		NOME = @NOME,
		CPF = @CPF
	WHERE Id = @Id
END