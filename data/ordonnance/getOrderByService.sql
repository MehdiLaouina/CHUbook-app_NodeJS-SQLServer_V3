SELECT *
FROM [dbo].[ordonnance] as O, [dbo].[service] as S
WHERE S.[Id_S] = O.Id_S
    AND S.libelle like '%'+@libelle+'%'