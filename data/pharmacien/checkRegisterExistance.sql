SELECT TOP 1
    Count(*) as "total"
FROM [dbo].[pharmacien]
WHERE email = @email