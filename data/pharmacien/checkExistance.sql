SELECT COUNT(*) as "total", password
FROM [dbo].[pharmacien]
WHERE email = @email
GROUP BY password