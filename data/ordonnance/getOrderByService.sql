SELECT O.Id, O.Id_Hosix, O.designation, O.prescripteur, O.date, O.etat, O.Id_P, O.Id_S, S.libelle
FROM [dbo].[ordonnance] as O, [dbo].[service] as S
WHERE S.[Id_S] = O.Id_S
    AND S.libelle like '%'+@libelle+'%'