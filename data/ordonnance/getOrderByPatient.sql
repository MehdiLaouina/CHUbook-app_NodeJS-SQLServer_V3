SELECT O.Id, O.Id_Hosix, O.designation, O.prescripteur, O.date, O.etat, O.Id_P, O.Id_S, P.nom, P.prenom, P.sexe, P.date_naissance
FROM [dbo].[ordonnance] as O, [dbo].[patient] as P
WHERE P.[Id_P] = O.Id_P
    AND P.nom like '%'+@nom+'%'
    AND P.prenom like '%'+@prenom+'%'