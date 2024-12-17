using System.Linq.Expressions;
using Gutargu.Backend.DAL.Entities;
using Gutargu.Backend.DAL.Contracts;
using Microsoft.EntityFrameworkCore;

namespace Gutargu.Backend.DAL.Repositories;

public abstract class CrudBaseRepository<TEntity> : ICrudBaseRepository<TEntity> where TEntity : BaseEntity
{
    private readonly DbSet<TEntity> _entities;
    private readonly GutarguDBContext _dbContext;
    
    public CrudBaseRepository(GutarguDBContext dBContext)
    {
        _dbContext = dBContext;
        _entities = _dbContext.Set<TEntity>();
    }

    public virtual async Task<int> Add(TEntity entity)
    {
        await _entities.AddAsync(entity);
        await this.SaveChanges();
        return entity.Id;
    }

    public virtual async Task<int> AddRange(IEnumerable<TEntity> entities)
    {
        _entities.AddRange(entities);
        return await this.SaveChanges();
    }

    public virtual async Task<bool> Delete(int entityId)
    {
        var entity = _entities.FirstOrDefault(entity => entity.Id == entityId)
            ?? throw new KeyNotFoundException($"Entity with id {entityId} not found");

        _entities.Remove(entity);
        
        return await this.SaveChanges() > 0;
    }

    public virtual async Task<bool> Delete(TEntity entity)
    {
        _entities.Remove(entity);
        return await this.SaveChanges() > 0;
    }

    public virtual async Task<int> DeleteRange(IEnumerable<TEntity> entities)
    {
        _entities.RemoveRange(entities);
        return await this.SaveChanges();
    }

    public virtual async Task<TEntity> GetById(int entityId, List<string>? includes = null)
    {
        IQueryable<TEntity> query = _entities;

        if (includes != null)
        {
            foreach (var include in includes)
            {
                query = query.Include(include);
            }
        }

        return await query.FirstOrDefaultAsync(entity => entity.Id == entityId)
            ?? throw new KeyNotFoundException($"Entity with id {entityId} not found");;
    }

    public virtual async Task<TEntity?> Get(Expression<Func<TEntity, bool>> predicate, List<string>? includes = null)
    {
        IQueryable<TEntity> query = _entities;

        if (includes != null)
        {
            foreach (var include in includes)
            {
                query = query.Include(include);
            }
        }

        return await query.FirstOrDefaultAsync(predicate);
    }

    public virtual async Task<IEnumerable<TEntity>> GetList(List<string>? includes = null, Expression<Func<TEntity, bool>>? predicate = null)
    {
        IQueryable<TEntity> query = _entities;

        if (includes != null)
        {
            foreach (var include in includes)
            {
                query = query.Include(include);
            }
        }

        if (predicate != null)
        {
            query = query.Where(predicate);
        }

        return await query.ToListAsync();
    }

    public virtual async Task<bool> Update(TEntity entity)
    {
        _entities.Update(entity);
        return await this.SaveChanges() > 0;
    }

    public virtual async Task<int> UpdateRange(IEnumerable<TEntity> entities)
    {
        _entities.UpdateRange(entities);
        return await this.SaveChanges();
    }

    protected async Task<int> SaveChanges()
    {
        return await _dbContext.SaveChangesAsync();
    }
}

